import * as cdk from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Distribution, ViewerProtocolPolicy, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { execSync } from 'child_process';

export class WebStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create S3 bucket for the website
        const websiteBucket = new Bucket(this, 'WebsiteBucket', {
            versioned: true,
            publicReadAccess: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        // Create CloudFront OAI
        const originAccessIdentity = new OriginAccessIdentity(this, 'OAI');

        // Grant CloudFront access to the S3 bucket
        websiteBucket.addToResourcePolicy(new PolicyStatement({
            actions: ['s3:GetObject'],
            resources: [websiteBucket.arnForObjects('*')],
            principals: [originAccessIdentity.grantPrincipal],
        }));

        // Create CloudFront distribution with default root object
        const distribution = new Distribution(this, 'WebDistribution', {
            defaultBehavior: {
                origin: new S3Origin(websiteBucket, {
                    originAccessIdentity: originAccessIdentity,
                }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: 'index.html',  // Set index.html as default for root URLs
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html', // Serve index.html on 404 for SPA
                    ttl: cdk.Duration.seconds(0),   // Disable caching for 404s
                },
            ],
        });

        // TODO: Remove this if refactoring into Github Actions later
        // Run the React build process
        execSync('npm run build', { cwd: '../web', stdio: 'inherit' });

        // Deploy the website files to S3
        new BucketDeployment(this, 'DeployWebsite', {
            sources: [Source.asset('../web/build')],
            destinationBucket: websiteBucket,
            distribution,
            distributionPaths: ['/*'],
        });

        // Output the CloudFront URL
        new cdk.CfnOutput(this, 'CloudFrontURL', {
            value: distribution.distributionDomainName,
        });
    }
}
