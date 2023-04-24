// eslint-disable-next-line import/order
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { insert } = require('../../commons/dynamodb');
const api = require('../../config/api');

const docClient = new AWS.DynamoDB.DocumentClient();

const table = process.env.PULSES_SUBSCRIBED_TABLE_NAME;

// Configurações do AWS S3
const s3 = new AWS.S3();
const bucketName = process.env.PULSES_SUBSCRIBED_S3_BUCKET;
const lastPageKey = 'lastPage';

const getTesteService = () => {
  const isS3BucketEmpty = async () => {
    try {
      const objects = await s3.listObjectsV2({ Bucket: bucketName }).promise();
      return objects.KeyCount === 0;
    } catch (error) {
      console.error(
        `Erro ao verificar se o bucket ${bucketName} está vazio:`,
        error
      );
      return error;
    }
  };

  const get = async () => {
    try {
      let lastPageObj;
      if (await isS3BucketEmpty()) {
        lastPageObj = undefined;
      } else {
        // Recupera o valor da última página acessada do S3
        lastPageObj = await s3
          .getObject({ Bucket: bucketName, Key: lastPageKey })
          .promise();
      }
      const lastPage = lastPageObj
        ? lastPageObj.Body.toString('utf-8').trim()
        : undefined;
      console.log({ isS3BucketEmpty: await isS3BucketEmpty() });
      console.log({ lastPageObj });
      console.log({ lastPage });

      const response = await api.get(`subscribed?page=${lastPage || 1}`);
      console.log({ responseAlien: response.data });

      // Extrai a propriedade "next" do objeto retornado
      const { next } = response.data;

      if (next) {
        // Extrai o valor da propriedade "page" da URL
        const page = next.match(/page=(\d+)/)[1];
        // Atualiza o valor da última página acessada no S3
        await s3
          .putObject({ Bucket: bucketName, Key: lastPageKey, Body: page })
          .promise();
      }

      const item = response.data;
      item.id = uuidv4();
      const params = {
        TableName: table,
        Item: item,
      };
      console.log({ params });

      await insert({
        table,
        item,
      });
      return 'Item inserido com sucesso';
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { get };
};

module.exports = getTesteService;
