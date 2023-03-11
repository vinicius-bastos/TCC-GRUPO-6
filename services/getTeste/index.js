const api = require('../../config/api');

const getTesteService = () => {
  const get = async () => {
    try {
      const response = await api.get('/09540080/json/');
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
