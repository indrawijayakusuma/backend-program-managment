const routes = (handler) => [
  {
    method: 'GET',
    path: '/gifts/{type}',
    handler: (request, h) => handler.getGifts(request, h),
  },
];

module.exports = routes;
