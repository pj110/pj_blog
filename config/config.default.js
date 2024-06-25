/* eslint valid-jsdoc: "off" */


module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1712800157406_1361';

  // add your middleware config here
  config.middleware = [ 'errInterceptors', 'jwtVerify' ];

  // add your user config here
  const userConfig = {
    bodyParser: {
      enable: true,
      encoding: 'utf8',
      formLimit: '100kb',
      jsonLimit: '100kb',
      strict: true,
      // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
      queryString: {
        arrayLimit: 100,
        depth: 5,
        parameterLimit: 1000
      },
      enableTypes: [ 'json', 'form', 'text' ],
      extendTypes: {
        text: [ 'text/xml', 'application/xml' ]
      }
    },


    //静态文件配置
    assets: {
      publicPath: '/public/',
    },
    // myAppName: 'egg',
    cluster: {
      listen: {
        path: '',
        port: 3000,
        hostname: '127.0.0.1',
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
    //校验参数配置
    validate: {
      convert: true,
    },
    //文件上传配置
    multipart: {
      mode: 'file',
      fileSize: '50mb',
      whitelist: [ '.jpeg', '.jpg', '.png', '.gif', '.docx', '.xls', '.doc', '.xlsx' ],
    },
    //

    //md5加密盐度
    md5: {
      key: 'pengjia',
    },
    //微信相关配置
    wx_id: {
      appid: 'wx4dba73e527988340',
      secret: '089a2290138125d2ad9ae36d106334ca',
      token: 'pjandlx', // 基础配置的token信息
      encodingAESKey: 'C562vzS4Zmjn4EehV8dMZut1Jk6qsUJYk0B4YuQdeQK', // 微信公众号的encodingAESKey信息
    },
    httpclient: {
      dataType: 'json'
    },
    //高德key
    gaode: {
      key: 'f7ac3fea43997e1e35fccd95d0acd41f'
    }

  };

  return {
    ...config,
    ...userConfig,
  };
};
