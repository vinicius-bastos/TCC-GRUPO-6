const { formatDate } = require('./date');
const { formatOrders } = require('./formatOrders');
const { getCustomer } = require('./getCustomer');
const { getCustomerOrders } = require('./getCustomerOrders');
const { getOrderTrackingStatus } = require('./getOrderTrackingStatus');
const { getTicketInfo } = require('./getTicketInfo');
const { getUserName } = require('./getUserName');
const { makeAWSGetRequest } = require('./makeAWSGetRequest');
const { getConsultantInfo } = require('./getConsultantInfo');
const {
  getCustomerMostBoughtProducts,
} = require('./getCustomerMostBoughtProducts');
const { customerCategories } = require('./customerCategories');

module.exports = {
  formatDate,
  formatOrders,
  getCustomer,
  getCustomerOrders,
  getOrderTrackingStatus,
  getTicketInfo,
  getUserName,
  makeAWSGetRequest,
  getConsultantInfo,
  getCustomerMostBoughtProducts,
  customerCategories,
};
