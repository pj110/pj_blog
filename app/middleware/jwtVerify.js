const whiteList = [ '/users/login', '/goodList', '/goodById' ];
module.exports = options => {
  return async function jwtVerify(ctx, next) {
    console.log('token', ctx.request.path);
    // await next();
    if (whiteList.indexOf(ctx.request.path) < 0) {
      const token = ctx.request.header.authorization;// 拿到token
      if (token) {
        try {
          // 解密token
          ctx.app.jwt.verify(token, options.secret);
          // decoded= {name, password, iat, exp} // jwt.sign时的数据，和iat,exp
          await next();
        } catch (err) {
          const newErr = new Error('登录失效');
          newErr.code = 403;
          newErr.cause = err;
          throw newErr;
        }
      } else {
        const newErr = new Error('未登录');
        newErr.code = 403;
        throw newErr;
      }
    } else {
      await next();
    }
  };
};
