import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc, SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancer, ApplicationProtocol, ListenerAction } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { FargateService, FargateTaskDefinition, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Repository } from 'aws-cdk-lib/aws-ecr';

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create a VPC for your Fargate service
        const vpc = new Vpc(this, 'ApiVpc', {
            maxAzs: 3, // Default is all AZs in the region
            subnetConfiguration: [
                {
                    name: 'PublicSubnet',
                    subnetType: SubnetType.PUBLIC,
                },
                {
                    name: 'PrivateSubnet',
                    subnetType: SubnetType.PRIVATE_WITH_NAT,
                },
            ],
        });

        // Create an ECS cluster within the VPC
        const cluster = new Cluster(this, 'ApiCluster', {
            vpc,
        });


        // Get the ECR repository
        const repository = Repository.fromRepositoryName(this, 'ApiRepository', 'api');

        // Define a Fargate task definition
        const taskDefinition = new ecs.FargateTaskDefinition(this, 'ApiTaskDefinition', {
            memoryLimitMiB: 512,
            cpu: 256,
        });

        // Add container to the task definition
        const container = taskDefinition.addContainer('ApiContainer', {
            image: ecs.ContainerImage.fromEcrRepository(repository),
            environment: {
                NODE_ENV: 'production',
            },
            logging: new ecs.AwsLogDriver({
                streamPrefix: 'ApiLogs',
            }),
        });

        // Optional: Add port mappings if your app listens on a specific port
        container.addPortMappings({
            containerPort: 3000,
            protocol: ecs.Protocol.TCP,
        });

        // Create a Fargate service
        const fargateService = new FargateService(this, 'ApiFargateService', {
            cluster,
            taskDefinition,
            desiredCount: 2, // Number of tasks to run
            assignPublicIp: true, // Whether the service should have public IP addresses
        });

        // Optional: Create an Application Load Balancer (ALB) for the Fargate service
        const alb = new ApplicationLoadBalancer(this, 'ApiALB', {
            vpc,
            internetFacing: true, // Public access to ALB
        });

        const listener = alb.addListener('ApiListener', {
            port: 80,
        });

        // Forward traffic from ALB to the Fargate service
        listener.addTargets('ApiTargetGroup', {
            port: 3000,
            targets: [fargateService],
            healthCheck: {
                path: '/',
            },
            protocol: ApplicationProtocol.HTTP,
        });

        // Output the ALB DNS so you can access your service
        new cdk.CfnOutput(this, 'ApiUrl', {
            value: alb.loadBalancerDnsName,
        });
    }
}
