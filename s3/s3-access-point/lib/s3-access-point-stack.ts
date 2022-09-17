import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'

export class S3AccessPointStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a s3 bucket
    const bucket = new s3.Bucket(this, 'pisakov-s3-access-point', {
      bucketName: "pisakov-s3-access-point", // provide a human-readable bucket name, otherwise it will be auto-generated
      enforceSSL: true, // security best practice
      removalPolicy: cdk.RemovalPolicy.DESTROY, // remove the bucket when the stack is down
      autoDeleteObjects: true, // auto-delete the objects inside the bucket, when it is removed
    });

    // access policy for the access point
    const accessPointName = "test-access-point";
    const userName = process.env.AWS_USER || "user/*"; // I use a specific user to provide an access

    const accessPolicy = {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Principal": {
            "AWS": `arn:aws:iam::${cdk.Stack.of(this).account}:${userName}`
          },
          "Effect": "Allow",
          "Action": [
            "s3:List*",
            "s3:Get*"
          ],
          "Resource": [
            `arn:aws:s3:${cdk.Stack.of(this).region}:${cdk.Stack.of(this).account}:accesspoint/${accessPointName}`
          ]
        }
      ]
    };

    /**
     * Create an access point.
     * Node: when the Access Point is added to the Bucket, the public access is removed from the Bucket.
     */
    new s3.CfnAccessPoint(this, 'TestAccessPoint', {
      bucket: bucket.bucketName,
      name: accessPointName,
      policy: accessPolicy,
    });

  }

}
