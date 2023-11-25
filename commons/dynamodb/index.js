const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// const dynamoDB = process.env.IS_OFFLINE
//   ? new AWS.DynamoDB.DocumentClient({
//       region: 'localhost',
//       endpoint: `http://localhost:4200`,
//       accessKeyId: 'DEFAULTACCESSKEY',
//       secretAccessKey: 'DEFAULTSECRET',
//     })
//   : new AWS.DynamoDB.DocumentClient();
  
 const dynamoDB = new AWS.DynamoDB.DocumentClient();

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

/**
 * @async
 * @param {String} table
 * @param {Object} query
 * @returns
 * * @example {table: 'dynamo-table', query: {mykey: 2}}
 */
const search = async ({ table, query }) => {
  try {
    const dynamoClient = getClient();

    const params = {
      TableName: table,
      Key: query,
    };

    const result = await dynamoClient.get(params).promise();
    return result.Item;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async ({ table, key }) => {
  try {
    const dynamoClient = getClient();

    const params = {
      TableName: table,
      Key: key,
    };
    const result = await dynamoClient.delete(params).promise();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const scan = async ({ table, filterOption }) => {
  try {
    const dynamoClient = getClient();

    let params = {
      TableName: table,
    };

    if (filterOption) {
      params = { TableName: table };
      Object.keys(filterOption).forEach((key) => {
        params[key.toString()] = filterOption[key];
      });
    }

    const result = await dynamoClient.scan(params).promise();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllItems = async ({ table, filterOption = {} }) => {
  try {
    const items = [];
    let lastEvaluatedKey = null;

    while (true) {
      const scanFilterOption = {
        ExclusiveStartKey: lastEvaluatedKey,
        ...filterOption,
      };

      // eslint-disable-next-line no-await-in-loop
      const result = await scan({
        table,
        filterOption: scanFilterOption,
      });

      items.push(...result.Items);

      if (result.LastEvaluatedKey) {
        lastEvaluatedKey = result.LastEvaluatedKey;
      } else {
        break;
      }
    }
    console.log({ items });

    return items;
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};

const registerAccess = async ({ email, endpoint, data }) => {
  await insert({
    table: process.env.USER_LOG_TABLE_NAME,
    item: {
      id: uuidv4(),
      email,
      // eslint-disable-next-line prettier/prettier
      accessed_at: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}T${new Date().getHours() - 3 < 10 ? `0${new Date().getHours() - 3}` : new Date().getHours() - 3}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds()}`,
      endpoint,
      data: data ? JSON.stringify(data) : null,
      ttl: new Date().getTime() + 60 * 24 * 60 * 60 * 1000, // 60 dias
    },
  });
};

module.exports = {
  insert,
  search,
  update,
  scan,
  deleteItem,
  registerAccess,
  getAllItems,
};
