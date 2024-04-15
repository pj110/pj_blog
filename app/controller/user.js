const { Controller } = require('egg');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,user';
  }
}

module.exports = UserController;
