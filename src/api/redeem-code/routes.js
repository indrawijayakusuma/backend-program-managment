const routes = (handler) => ([
  {
    method: 'GET',
    path: '/redeem-code/{noKtp}',
    handler: (request, h) => handler.getRedeemCode(request, h),
  },
  {
    method: 'GET',
    path: '/redeem-code',
    handler: (request, h) => handler.getAllRedeemCode(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
]);

module.exports = routes;
