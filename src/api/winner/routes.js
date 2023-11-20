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
        maxBytes: 1000 * 900,
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
  {
    method: 'GET',
    path: '/winners/ktp/{ktp}',
    handler: (request, h) => Handler.getWinnersByKtp(request, h),
  },
];

module.exports = routes;
