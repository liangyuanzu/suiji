import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650296113333_2980';

  // CORS
  config.cors = {
    origin: 'http://127.0.0.1:3333',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  // email config
  config.smtp = {
    host: 'smtp.qq.com',
    port: 465,
    user: 'liangyuanzu@qq.com', // 发送邮件的邮箱
    pass: 'mqlypielwfbiebbf', // 邮箱对应的授权码
  };

  // add your egg config in here
  config.middleware = [ 'auth' ];
  config.auth = {
    urlWhite: [
      '/api/v1/user/signup',
      '/api/v1/user/signin',
      '/api/v1/user/sign/requestResetPassword',
      '/api/v1/user/sign/resetPassword',
    ],
  };

  // connect to the database
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/suiji',
      options: {
        useUnifiedTopology: true,
      },
      // @ts-ignore
      plugins: [
        function(schema) {
          schema.set('toJSON', { virtuals: true });
          schema.set('toObject', { virtuals: true });
        },
      ],
    },
  };

  // redis config
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };

  // socket.io
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        // TODO:auth
        connectionMiddleware: [ 'connection' ],
        packetMiddleware: [],
      },
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
