const WinnerHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'winner',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new WinnerHandler(service);
    server.route(routes(handler));
  },
};
