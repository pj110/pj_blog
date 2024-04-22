const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');

// const { getNowTime } = require('../util/index.js');

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
      reqData.time = ctx.helper.getNowTime();
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

    reqData.updata_time = ctx.helper.getNowTime();
    const updatedata = await service.good.goodUpdate(reqData);
    console.log(updatedata);
    ctx.body = {
      code: 200,
      msg: '修改成功',
    };
  }

  async goodList() {
    const { ctx, service } = this;
    const query = { ...ctx.query };
    if (!query.pageSize) {
      query.pageSize = 10;
    }
    // 校验参数
    ctx.validate({
      type: {
        type: 'number',
      },
      page: {
        type: 'number',
      },
    }, query);
    const listData = await service.good.goodList(query);
    ctx.body = {
      code: 200,
      data: listData,
    };

  }

  async goodListAll() {
    const { ctx, service } = this;
    const query = { ...ctx.query };
    if (!query.pageSize) {
      query.pageSize = 10;
    }
    // 校验参数
    ctx.validate({
      page: {
        type: 'number',
      },
    }, query);
    const listData = await service.good.goodListAll(query);
    ctx.body = {
      code: 200,
      data: listData,
    };

  }

  async goodById() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate({
      id: {
        type: 'number',
      },
    }, ctx.query);
    const id = ctx.query.id;
    const byIdData = await service.good.goodById(id);
    ctx.body = {
      code: 200,
      data: byIdData,
    };
  }

  async goodUpload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    console.log('filename----------------------', file);
    const fileData = fs.readFileSync(file.filepath);
    const base64Str = Buffer.from(fileData, 'binary')
      .toString('base64');
    const bufferData = Buffer.from(base64Str, 'base64');
    // 获取当前日期，用于文件创建
    const timestamp = Date.now();
    const filename = `file${timestamp}${path.extname(file.filename)}`;
    // 指定上传路径
    const uploadBasePath = '../public/uploadForFile';
    const src = path.join(__dirname, uploadBasePath, filename);
    await fs.writeFileSync(src, bufferData);
    ctx.body = {
      alt: file.filename,
      url: `/public/uploadForFile/${filename}`,
    };
  }
}

module.exports = GoodController;
