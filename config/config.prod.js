module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1712800157406_1361';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // mysql配置
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'mysql.com',
        // 端口号
        port: '3306',
        // 用户名
        user: 'test_user',
        // 密码
        password: 'test_password',
        // 数据库名
        database: 'test',
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
