const axios = require('axios');

const api = axios.create({
  baseURL: 'https://otx.alienvault.com/api/v1/pulses',
  headers: {
    'X-OTX-API-KEY':
      'fe6ad4f56a13ca28c717a3682bfa7653c0cdc4aacd12e56cb43589d8f531be10',
  },
});

module.exports = api;
