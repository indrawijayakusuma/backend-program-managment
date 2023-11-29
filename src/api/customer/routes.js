const routes = (Handler) => [
  {
    method: 'GET',
    path: '/customers/{code}',
    handler: (request, h) => Handler.getCustomerByRedeemCode(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
