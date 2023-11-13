require('dotenv').config();
const Hapi = require('@hapi/hapi');

const visitor = require('./api/visitor');
const VisitorService = require('./service/postgress/VisitorServices');

const customer = require('./api/customer');
const CustomerService = require('./service/postgress/CustomerService');

const redeemCode = require('./api/redeem-code');
const RedeemCodeService = require('./service/postgress/RedeemCodeService');

const winner = require('./api/winner');
const WinnerService = require('./service/postgress/WinnerService');

const init = async () => {
  const customerService = new CustomerService();
  const visitorService = new VisitorService(customerService);
  const redeemCodeService = new RedeemCodeService();
  const winnerService = new WinnerService(redeemCodeService);

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: visitor,
      options: {
        service: visitorService,
        redeemCodeService,
      },
    },
    {
      plugin: redeemCode,
      options: {
        service: redeemCodeService,
      },
    },
    {
      plugin: customer,
      options: {
        service: customerService,
      },
    },
    {
      plugin: winner,
      options: {
        service: winnerService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      // if (response instanceof ClientError) {
      //   const newResponse = h.response({
      //     status: 'fail',
      //     message: response.message,
      //   });
      //   newResponse.code(response.statusCode);
      //   return newResponse;
      // }
      // if (!response.isServer) {
      //   return h.continue;
      // }
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
