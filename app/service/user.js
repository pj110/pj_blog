const Service = require('egg').Service;

class userService extends Service {
  async getUserPassWord(data) {
    return await this.app.mysql.get('user', {
      ...data,
    });
  }
}

module.exports = userService;
