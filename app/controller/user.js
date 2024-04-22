const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,user';
  }

  async login() {
    const { ctx, service, app } = this;
    const reqData = { ...ctx.request.body }; // 检查参数
    ctx.validate({
      name: {
        type: 'string',
        required: true,
      },
      pwd: {
        type: 'string',
        required: true,
      },
    }, reqData);

    const userData = await service.user.getUserPassWord({ name: reqData.name });
    const password = ctx.helper.passwordMD5(reqData.pwd);
    console.log('userData', userData, password);
    if (!userData) {
      ctx.body = {
        code: 1,
        msg: '账号或密码错误',
      };
      return;
    }
    if (userData.pwd === password) {
      const token = app.jwt.sign({ id: userData.id }, app.config.jwtVerify.secret);
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: {
          token,
        },
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '密码错误',
      };
    }
  }
}

module.exports = UserController;
