module.exports = () => {
  return async function errInterceptors(ctx, next) {
    // console.log('token');
    try {
      await next();
    } catch (err) {
      // console.log('err', JSON.stringify(err));
      switch (err.code) {
        case 403:
          ctx.status = 403;
          ctx.body = { message: err.message, code: 1 };
          break;
        case 'invalid_param':
          ctx.status = 500;
          ctx.body = { message: err.message, code: 1 };
          break;
        default:
          ctx.status = 500;
          ctx.body = { message: '服务器错误', code: 1 };
      }
    }
  };
};
