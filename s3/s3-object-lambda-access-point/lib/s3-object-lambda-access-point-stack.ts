import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3objectlambda from '@aws-cdk/aws-s3objectlambda-alpha';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from "path";

export class S3ObjectLambdaAccessPointStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a s3 bucket
    const bucket = new s3.Bucket(this, 'MyObjectLambdaAccessPointBucket', {
      bucketName: "pisakov-s3-object-lambda-access-point", // provide a human-readable bucket name, otherwise it will be auto-generated
      enforceSSL: true, // security best practice
      removalPolicy: cdk.RemovalPolicy.DESTROY, // remove the bucket when the stack is down
      autoDeleteObjects: true, // auto-delete the objects inside the bucket, when it is removed
    });

    const handler = new lambda.Function(this, 'MyObjectLambdaAccessPointFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, "../content/lambda"))
    });

    new s3objectlambda.AccessPoint(this, 'MyObjectLambdaAccessPoint', {
      bucket: bucket,
      handler: handler,
      accessPointName: 'my-object-lambda-access-point',
    });
  }
}
