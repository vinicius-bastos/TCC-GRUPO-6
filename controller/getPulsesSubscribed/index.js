const getPulsesSubscribedServices = require('../../services');

const getPulsesSubscribed = async () => {
  try {
    const response =
      await getPulsesSubscribedServices.getPulsesSubscribedService(); // teste

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

module.exports = { getPulsesSubscribed };
