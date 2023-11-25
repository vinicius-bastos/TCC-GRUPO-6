const getPulsesSubscribedController = require('./getPulsesSubscribed');
const getPulsesGenericController = require('./getPulseGeneric');

const getPulsesSubscribed = async (event, context) =>
  getPulsesSubscribedController.getPulsesSubscribed(event, context);

const getPulsesGeneric = async (event, context) =>
  getPulsesGenericController.getPulsesGeneric(event, context);

module.exports = {
  getPulsesSubscribed,
  getPulsesGeneric,
};
