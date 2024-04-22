/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1712800157406_1361';

  // add your middleware config here
  config.middleware = [ 'errInterceptors', 'jwtVerify' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    cluster: {
      listen: {
        path: '',
        port: 3000,
        hostname: '0.0.0.0',
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    jwtVerify: {
      secret: 'wangdandan',
    },
    validate: {
      convert: true,
    },
    multipart: {
      mode: 'file',
      fileSize: '50mb',
      whitelist: [ '.jpeg', '.jpg', '.png', '.gif', '.docx', '.xls', '.doc', '.xlsx' ],
    },
    md5: {
      key: 'pengjia',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
