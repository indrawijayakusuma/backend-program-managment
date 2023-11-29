const routes = (handler) => [
  {
    method: 'GET',
    path: '/visitors',
    handler: (request, h) => handler.getVisitor(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'POST',
    path: '/visitors',
    handler: (request, h) => handler.postVisitor(request, h),
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
