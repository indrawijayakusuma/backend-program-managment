const routes = (Handler) => [
  {
    method: 'POST',
    path: '/winners',
    handler: (request, h) => Handler.postWinner(request, h),
  },
  {
    method: 'GET',
    path: '/winners',
    handler: (request, h) => Handler.getWinners(request, h),
  },
];

module.exports = routes;
