#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebStack } from '../lib/web-stack';
import { ApiStack } from '../lib/api-stack';

const app = new cdk.App();
new WebStack(app, 'WebStack', {});
new ApiStack(app, 'ApiStack-2', {});
