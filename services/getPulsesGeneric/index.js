const { v4: uuidv4 } = require('uuid');
const { insert } = require('../../commons/dynamodb');
const api = require('../../config/api');

const table = process.env.PULSES_GENERIC_TABLE_NAME;

const getPulsesGenericService = () => {
  const get = async ({ content }) => {
    try {
      const response = await api.get(`${content.endpoint}`);
      console.log({ endpoint: content.endpoint });
      console.log({ responseAlien: response.data });

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

module.exports = getPulsesGenericService;
