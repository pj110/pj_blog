const { Controller } = require('egg');

class UerController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,user';
  }
}

module.exports = UerController;
