const getPulsesSubscribed = require('./getPulsesSubscribed');
const getPulsesGeneric = require('./getPulsesGeneric');

const getPulsesSubscribedService = {
  getPulsesSubscribedService: getPulsesSubscribed().get,
};

const getPulsesGenericService = {
  getPulsesGenericService: getPulsesGeneric().get,
};

module.exports = { getPulsesSubscribedService, getPulsesGenericService };
