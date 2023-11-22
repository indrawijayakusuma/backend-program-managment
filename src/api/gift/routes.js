const routes = (handler) => [
  {
    method: 'GET',
    path: '/gifts/{type}',
    handler: (request, h) => handler.getGifts(request, h),
  },
  {
    method: 'GET',
    path: '/gifts',
    handler: (request, h) => handler.getAllGifts(request, h),
  },
  {
    method: 'POST',
    path: '/gifts',
    handler: (request, h) => handler.postGift(request, h),
  },
];

module.exports = routes;
