const { Controller } = require('egg');
const { getNowTime } = require('../util/index.js');

class GoodController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,good';
  }

  // 添加新数据
  async goodAdd() {
    const { ctx, service } = this;
    const reqData = { ...ctx.request.body };
    // 检查参数
    ctx.validate({
      title: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'number',
        required: true,
      },
    }, reqData);
    // 如果没传就用当前时间
    if (!reqData.time) {
      reqData.time = getNowTime();
    }
    const addData = await service.good.goodAdd(reqData);
    console.log('ctx', addData);
    ctx.body = {
      code: 200,
      msg: '添加成功',
    };
  }

  async goodDel() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    const deldata = await service.good.goodDel(id);
    console.log(deldata);
    ctx.body = {
      code: 200,
      msg: '删除成功',
    };
  }

  async goodUpdate() {
    const { ctx, service } = this;
    const reqData = { ...ctx.request.body };
    // 检查参数
    ctx.validate({
      id: {
        type: 'number',
        required: true,
      },
      title: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'number',
        required: true,
      },
    }, reqData);

    reqData.updata_time = getNowTime();
    const updatedata = await service.good.goodUpdate(reqData);
    console.log(updatedata);
    ctx.body = {
      code: 200,
      msg: '修改成功',
    };
  }

  async goodList() {

  }

  async goodListAll() {

  }

  async goodById() {
  }

  async goodUpload() {
  }

}

module.exports = GoodController;
