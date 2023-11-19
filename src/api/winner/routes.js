const path = require('path');

const routes = (Handler) => [
  {
    method: 'POST',
    path: '/winners',
    handler: (request, h) => Handler.postWinner(request, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 1000 * 500,
      },
    },
  },
  {
    method: 'GET',
    path: '/winners',
    handler: (request, h) => Handler.getWinners(request, h),
  },
  {
    method: 'GET',
    path: '/winners/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
