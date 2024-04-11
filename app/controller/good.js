const { Controller } = require('egg');

class GoodController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,good';
  }
}

module.exports = GoodController;
