module.exports = () => {
  const config = exports = {};

  // add your middleware config here
  // config.middleware = [];

  // add your user config here
  const userConfig = {
    logger: {
      level: 'DEBUG',
      dir: './logs/local', // 打印目录重定向
      outputJSON: true, // json格式输出
    },
    // myAppName: 'egg',
    // mysql配置
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '43.138.162.161',
        // 端口号
        port: '3306',
        // 用户名
        user: 'bziaobiao_test',
        // 密码
        password: 'Cw8f4kta4hbYNpWj',
        // 数据库名
        database: 'bziaobiao_test',
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
