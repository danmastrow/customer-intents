import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, Ec2Service, Ec2TaskDefinition, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { InstanceType } from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancer, ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // 1. Create a VPC
        const vpc = new Vpc(this, 'Vpc', {
            maxAzs: 2, // Spread across 2 availability zones
        });

        // 2. Create an ECS Cluster
        const cluster = new Cluster(this, 'EcsCluster', {
            vpc,
        });

        // 3. Create an ECS Task Definition for EC2
        const taskDefinition = new Ec2TaskDefinition(this, 'TaskDef', {
            // @ts-ignore
            networkMode: "bridge"
        });

        // 4. Add a container to the task definition using the ECR image
        const container = taskDefinition.addContainer('NestJsContainer', {
            image: ContainerImage.fromRegistry('<aws_account_id>.dkr.ecr.your-region.amazonaws.com/nestjs-api:latest'), // Replace with your ECR image URL
            memoryLimitMiB: 512,
            cpu: 256,
        });

        container.addPortMappings({
            containerPort: 3000,
            hostPort: 3000,
            protocol: cdk.aws_ecs.Protocol.TCP,
        });

        // 5. Create an ECS EC2 service
        const ecsService = new Ec2Service(this, 'NestJsService', {
            cluster,
            taskDefinition,
            desiredCount: 1, // Running a single instance of the task
        });

        // 6. Create an Application Load Balancer
        const loadBalancer = new ApplicationLoadBalancer(this, 'ApiLoadBalancer', {
            vpc,
            internetFacing: true,
        });

        // 7. Add a listener to the load balancer on port 80
        const listener = loadBalancer.addListener('Listener', {
            port: 80,
            open: true,
        });

        // 8. Attach the ECS service to the Load Balancer
        listener.addTargets('EcsTargets', {
            port: 80,
            targets: [ecsService],
            healthCheck: {
                path: '/',
                interval: cdk.Duration.seconds(30),
            },
        });

        // 9. Output the Load Balancer DNS name
        new cdk.CfnOutput(this, 'LoadBalancerDNS', {
            value: loadBalancer.loadBalancerDnsName,
        });
    }
}
