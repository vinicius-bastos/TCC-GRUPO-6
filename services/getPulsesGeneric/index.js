const { v4: uuidv4 } = require('uuid');
const api = require('../../config/api');
const S3 = require('../../commons/s3');

const bucketName = process.env.PULSES_GENERIC_S3_BUCKET;

const getPulsesGenericService = () => {
  const get = async ({ content }) => {
    try {
      console.log({ content });
      console.log({ bucketName });
      const response = await api.get(`${content}`);
      const item = response.data;
      item.id = uuidv4();
      const directoryName = content.replace(/[^a-zA-Z0-9]/g, '_');

      console.log({ itemId: item.id });
      const fileName = `${item.id}.json`;
      const filePath = `${directoryName}/${fileName}`;
      const contentType = 'application/json';

      await S3.upload(bucketName, JSON.stringify(item), filePath, contentType);

      return 'Item inserido com sucesso';
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { get };
};

module.exports = getPulsesGenericService;
