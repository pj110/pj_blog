const Service = require('egg').Service;

class userService extends Service {
  async goodAdd(data) {
    return await this.app.mysql.insert('zhaobiao_data', {
      ...data,
    });
  }
}

module.exports = userService;
