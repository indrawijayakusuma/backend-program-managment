const routes = (Handler) => [
  {
    method: 'GET',
    path: '/customers/{code}',
    handler: (request, h) => Handler.getCustomerByRedeemCode(request, h),
  },
];

module.exports = routes;
