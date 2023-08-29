const controller = require('./controller');

const getPulsesSubscribed = async (event, context) =>
  controller.getPulsesSubscribed(event, context);

const getPulsesGeneric = async (event, context) =>
  controller.getPulsesGeneric(event, context);

module.exports = {
  getPulsesSubscribed,
  getPulsesGeneric,
};
