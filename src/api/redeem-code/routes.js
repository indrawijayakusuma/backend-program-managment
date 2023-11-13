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
  },
]);

module.exports = routes;
