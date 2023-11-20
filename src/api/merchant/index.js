const MerchantHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'merchant',
  version: '1.0.0',
  register: async (server, { service, redeemCodeService, validator }) => {
    const handler = new MerchantHandler(service, redeemCodeService, validator);
    server.route(routes(handler));
  },
};
