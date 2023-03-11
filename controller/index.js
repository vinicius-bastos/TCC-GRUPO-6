const getTesteController = require('./getTeste');

const getTeste = async (event, context) =>
  getTesteController.getTeste(event, context);

module.exports = {
  getTeste,
};
