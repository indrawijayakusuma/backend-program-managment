const VisitorHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'visitor',
  version: '1.0.0',
  async register(server, { service, redeemCodeService, validator }) {
    const visitorHandler = new VisitorHandler(service, redeemCodeService, validator);
    server.route(routes(visitorHandler));
  },
};
