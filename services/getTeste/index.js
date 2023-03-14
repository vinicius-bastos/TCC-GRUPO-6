const api = require('../../config/api');

const getTesteService = () => {
  const get = async () => {
    try {
      const response = await api.get('/subscribed?page=1');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { get };
};

module.exports = getTesteService;
