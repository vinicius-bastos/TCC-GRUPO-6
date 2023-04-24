const AWS = require('aws-sdk');

const dynamoDB = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: `http://localhost:4200`,
      accessKeyId: 'DEFAULT_ACCESS_KEY',
      secretAccessKey: 'DEFAULT_SECRET',
    })
  : new AWS.DynamoDB.DocumentClient();

const getClient = () => dynamoDB;

// Uma letra para cada parâmetro
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l'];

const getExpressionsFromValues = (fields, values) => {
  const updateExp = fields
    .map((field, index) => `${field} = :${letters[index]}`)
    .join(', ');

  const atributesExp = values
    .map((value, index) => {
      const key = `:${letters[index]}`;
      return { [key]: value };
    })
    .reduce((previous, actual) => Object.assign(previous, actual), {});
  return { updateExp, atributesExp };
};

const insert = async ({ table, item }) => {
  try {
    const dynamoClient = getClient();
    const params = {
      TableName: table,
      Item: item,
    };

    const result = await dynamoClient.put(params).promise();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @async
 * @param {String} table
 * @param {Object} query
 * @param {Array} fields
 * @param {Array} values
 * @returns
 * @example {table: 'dynamo-table', query: {mykey: 2}, fields: ['hours'], values: ['21']}
 */
const update = async ({ table, query, fields, values }) => {
  try {
    const { updateExp, atributesExp } = getExpressionsFromValues(
      fields,
      values
    );
    const dynamoClient = getClient();

    const params = {
      TableName: table,
      Key: query,
      UpdateExpression: `set ${updateExp}`,
      ExpressionAttributeValues: atributesExp,
      ReturnValues: 'UPDATED_NEW',
    };
    const result = await dynamoClient.update(params).promise();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  insert,
  update,
};
