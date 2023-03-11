const controller = require('./controller');

const getTeste = async (event, context) => controller.getTeste(event, context);

module.exports = {
  getTeste,
};
