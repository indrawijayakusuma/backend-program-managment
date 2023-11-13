const routes = (handler) => [
  {
    method: 'GET',
    path: '/visitors',
    handler: (request, h) => handler.getVisitor(request, h),
  },
  {
    method: 'POST',
    path: '/visitors',
    handler: (request, h) => handler.postVisitor(request, h),
  },
];

module.exports = routes;
