module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1712800157406_1361';

  // add your middleware config here
  // config.middleware = [];

  // add your user config here
  const userConfig = {
    logger: {
      level: 'DEBUG',
      allowDebugAtProd: true,
      dir: './logs/local', // 打印目录重定向
      outputJSON: true, // json格式输出
    },
    // myAppName: 'egg',
    // mysql配置

    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'zhaobiao',
        // 密码
        password: 'KGFkjMZ24HHspa5m',
        // 数据库名
        database: 'zhaobiao',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
