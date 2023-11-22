const GiftHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'gift',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new GiftHandler(service, validator);
    server.route(routes(handler));
  },
};
