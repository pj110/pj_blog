const whiteList = [ '/login', '/login/register' ];
module.exports = options => {
  return async function jwtVerify(ctx, next) {
    console.log('token');
    await next();
    // if (whiteList.indexOf(ctx.request.url) < 0) {
    //   const token = ctx.request.header.authorization;// 拿到token
    //   if (token) {
    //     try {
    //       // 解密token
    //       ctx.app.jwt.verify(token, options.secret);
    //       // decoded= {name, password, iat, exp} // jwt.sign时的数据，和iat,exp
    //       await next();
    //     } catch (err) {
    //       ctx.body = {
    //         code: 1,
    //         msg: '登录失效',
    //       };
    //     }
    //   } else {
    //     ctx.body = {
    //       code: 1,
    //       msg: '没有token',
    //     };
    //   }
    // } else {
    //   await next();
    // }
  };
};
