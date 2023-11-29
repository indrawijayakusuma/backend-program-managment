require('dotenv').config();
const path = require('path');
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const Inert = require('@hapi/inert');

const visitor = require('./api/visitor');
const VisitorService = require('./service/postgress/VisitorServices');
const VisitorValidator = require('./validator/visitorValidator');

const merchant = require('./api/merchant');
const MerchantService = require('./service/postgress/MerchantService');
const MerchantValidator = require('./validator/MerchantValidator');

const customer = require('./api/customer');
const CustomerService = require('./service/postgress/CustomerService');

const redeemCode = require('./api/redeem-code');
const RedeemCodeService = require('./service/postgress/RedeemCodeService');

const winner = require('./api/winner');
const WinnerService = require('./service/postgress/WinnerService');
const ClientError = require('./exceptions/ClientError');

const StorageService = require('./service/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

const gift = require('./api/gift');
const GiftService = require('./service/postgress/GiftService');
const GiftValidator = require('./validator/gift');

const users = require('./api/users');
const UsersService = require('./service/postgress/UsersService');
const UserValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/postgress/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () => {
  const customerService = new CustomerService();
  const visitorService = new VisitorService(customerService);
  const merchantService = new MerchantService(customerService);
  const redeemCodeService = new RedeemCodeService();
  const winnerService = new WinnerService(redeemCodeService);
  const storageService = new StorageService(path.resolve(__dirname, 'api/winner/file/images'));
  const giftService = new GiftService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('auth_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
      timeSkewSec: 15,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: Inert,
    },
  ]);

  await server.register([
    {
      plugin: visitor,
      options: {
        service: visitorService,
        redeemCodeService,
        validator: VisitorValidator,
      },
    },
    {
      plugin: merchant,
      options: {
        service: merchantService,
        redeemCodeService,
        validator: MerchantValidator,
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
        storageService,
        imageValidator: UploadsValidator,
      },
    },
    {
      plugin: gift,
      options: {
        service: giftService,
        validator: GiftValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UserValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    console.log(response.message);
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      if (!response.isServer) {
        return h.continue;
      }
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
