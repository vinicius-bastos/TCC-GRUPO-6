const axios = require('axios');

const api = axios.create({
  baseURL: 'https://otx.alienvault.com/api/v1/pulses',
  headers: {
    'X-OTX-API-KEY':
      '2894dfbd7a7553e41d834d3ef75e176aea66ccabcbd61aaf518ed2bc3c26026e',
  },
});

module.exports = api;
