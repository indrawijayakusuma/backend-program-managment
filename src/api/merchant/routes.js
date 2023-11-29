const routes = (handler) => [
  {
    method: 'GET',
    path: '/merchants',
    handler: (request, h) => handler.getMerchants(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'POST',
    path: '/merchants',
    handler: (request, h) => handler.postMerchant(request, h),
  },
];

module.exports = routes;
