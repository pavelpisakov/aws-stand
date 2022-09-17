const { S3 } = require('aws-sdk');
const axios = require('axios').default;

exports.handler = async (event) => {
  const s3 = new S3();

  // Retrieve the operation context object from the event. This object indicates where the WriteGetObjectResponse request
  // should be delivered and contains a presigned URL in 'inputS3Url' where we can download the requested object from.
  // The 'userRequest' object has information related to the user who made this 'GetObject' request to S3 Object Lambda.
  const { userRequest, getObjectContext } = event;
  const { outputRoute, outputToken, inputS3Url } = getObjectContext;

  // If the user presented our custom 'SuperSecretToken' header, we send the requested object back to the user.
  // Again, note the presence of 'await'.
  const presignedResponse = await axios.get(inputS3Url);
  const transformed = presignedResponse.data.toUpperCase();

  await s3.writeGetObjectResponse({
    RequestRoute: outputRoute,
    RequestToken: outputToken,
    Body: transformed,
  }).promise();

  // Gracefully exit the Lambda function.
  return { statusCode: 200 };

}