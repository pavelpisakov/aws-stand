# Managing data access with Amazon S3 access points

- _Access Points_ are named network endpoints that are attached to the bucket
- Each _Access Point_ has distinct permissions and network controls
- Each _Access Point_ enforces a customized access point polity that works in conjunction with the bucket policy
- _Access Point_ may be:
  - Internet facing
  - VPC only - to restrict data access to a private network

# Q&A
Q: What is the difference between Bucket Policy and Access Points?

A: S3 Access Points are used for provide access to shared data sets for different applications, teams, whether for analytics, machine learning, real-time monitoring, or other data lake use cases. If everything is managed within a single bucket policy it may end up with dozens to hundreds configurations for applications with different permission levels. Amazon S3 Access Point simplifies data access for any AWS service or customer application. Additionally, it allows to use S3 via a private VPC and do not expose it publicly.

# Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
