#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3ObjectLambdaAccessPointStack } from '../lib/s3-object-lambda-access-point-stack';
import * as dotenv from 'dotenv'

dotenv.config();
const app = new cdk.App();
new S3ObjectLambdaAccessPointStack(app, 'S3ObjectLambdaAccessPointStack', {});