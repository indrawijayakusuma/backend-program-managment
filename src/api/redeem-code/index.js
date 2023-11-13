const RedeemCodeHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'redeem-code',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new RedeemCodeHandler(service);
    server.route(routes(handler));
  },
};
