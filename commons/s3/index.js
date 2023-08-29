const AWS = require('aws-sdk');

const s3Client = process.env.IS_OFFLINE
  ? new AWS.S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: new AWS.Endpoint('http://localhost:4569'),
    })
  : new AWS.S3();

const S3 = {
  get: async (fileName, bucket) => {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };

    const data = await s3Client.getObject(params).promise();

    if (!data) {
      throw Error(`Failed to get file ${fileName}, from ${bucket}`);
    }

    return data;
  },
  upload: async (bucket, body, filePath, contentType) => {
    const params = {
      Bucket: bucket,
      Body: body,
      Key: filePath,
      ACL: 'public-read',
      ContentType: contentType,
    };

    const newData = await s3Client.upload(params).promise();

    if (!newData) {
      throw Error('there was an error writing the file');
    }

    return newData.Location;
  },
};

module.exports = S3;
