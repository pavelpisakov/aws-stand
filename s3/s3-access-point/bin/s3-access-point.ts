#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3AccessPointStack } from '../lib/s3-access-point-stack';
import * as dotenv from 'dotenv'

dotenv.config()
const app = new cdk.App();
new S3AccessPointStack(app, 'S3AccessPointStack', {});