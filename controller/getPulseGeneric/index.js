const getPulsesGenericServices = require('../../services');

const getPulsesGeneric = async (event) => {
  try {
    const queryParams = event.queryStringParameters;
    const endpoint = queryParams?.endpoint;

    console.log({ queryParams });
    console.log({ endpoint });

    if (!endpoint) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required query parameters',
        }),
      };
    }

    const response = await getPulsesGenericServices.getPulsesGenericService({
      content: endpoint,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  } catch (error) {
    if (error.statusCode === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify('Erro no server da API'),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      };
    }
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(`${error?.response?.data?.message}`),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }
};

module.exports = { getPulsesGeneric };
