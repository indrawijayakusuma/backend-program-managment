const CustomerHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'customer',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new CustomerHandler(service);
    server.route(routes(handler));
  },
};
