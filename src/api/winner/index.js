const WinnerHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'winner',
  version: '1.0.0',
  register: async (server, { service, storageService, imageValidator }) => {
    const handler = new WinnerHandler(service, storageService, imageValidator);
    server.route(routes(handler));
  },
};
