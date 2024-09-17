import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc, SubnetType } from 'aws-cdk-lib/aws-ec2';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancer, ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { FargateService } from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { CachePolicy, Distribution, OriginProtocolPolicy, OriginRequestPolicy, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CfnOutput } from 'aws-cdk-lib';

export class ApiStack extends Stack {
    public readonly apiUrl: string;
    public readonly cloudFrontUrl: string;

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
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS,
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
            image: ecs.ContainerImage.fromEcrRepository(repository, "v3"),
            environment: {
                NODE_ENV: 'production',
                UI_URL: "https://d4xr38f7ml990.cloudfront.net",
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
            desiredCount: 1, // Number of tasks to run
            assignPublicIp: true, // Whether the service should have public IP addresses
        });

        // Create an Application Load Balancer (ALB) for the Fargate service
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
        this.apiUrl = alb.loadBalancerDnsName;
        new CfnOutput(this, 'ApiUrl', {
            value: this.apiUrl,
        });

        // CloudFront for API, using the ALB as the origin
        const distribution = new Distribution(this, 'ApiCloudFront', {
            defaultBehavior: {
                origin: new HttpOrigin(alb.loadBalancerDnsName, {
                    protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
                }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: CachePolicy.CACHING_DISABLED,
                originRequestPolicy: OriginRequestPolicy.ALL_VIEWER,
            },
        });

        // Output the CloudFront distribution URL
        this.cloudFrontUrl = distribution.distributionDomainName;
        new CfnOutput(this, 'CloudFrontUrl', {
            value: this.cloudFrontUrl,
        });
    }
}
