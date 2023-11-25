const getPulsesSubscribed = require('./getPulsesSubscribed');
const getPulsesGeneric = require('./getPulsesGeneric');

const getPulsesService = {
  getPulsesGenericService: getPulsesGeneric().get,
  getPulsesSubscribedService: getPulsesSubscribed().get,
};

module.exports = getPulsesService;
