const routes = (handler) => [
  {
    method: 'GET',
    path: '/gifts/{type}',
    handler: (request, h) => handler.getGifts(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'GET',
    path: '/gifts',
    handler: (request, h) => handler.getAllGifts(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'POST',
    path: '/gifts',
    handler: (request, h) => handler.postGift(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
