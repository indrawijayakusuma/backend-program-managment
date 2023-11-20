const GiftHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'gift',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new GiftHandler(service);
    server.route(routes(handler));
  },
};
