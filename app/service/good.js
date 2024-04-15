const Service = require('egg').Service;

class goodService extends Service {
  async goodAdd(data) {
    return await this.app.mysql.insert('zhaobiao_data', {
      ...data,
    });
  }

  async goodDel(id) {
    return await this.app.mysql.delete('zhaobiao_data', {
      id,
    });
  }

  async goodUpdate(data) {
    return await this.app.mysql.update('zhaobiao_data', {
      ...data,
    });
  }
  async goodList(data) {
    return await this.app.mysql.update('zhaobiao_data', {
      ...data,
    });
  }

}

module.exports = goodService;
