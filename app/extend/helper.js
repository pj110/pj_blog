const utility = require('utility');

module.exports = {
  // md5加密
  passwordMD5(pwd) {
    const onePwd = utility.md5(pwd);
    return utility.md5(onePwd + this.app.config.md5.key);
  },
  // 获取当前时间
  getNowTime() {
    // 创建一个 Date 对象，它会自动获取当前的日期时间
    const now = new Date();

    // 在个位数的月份、日期、小时、分钟、秒前加零
    function padZero(num) {
      return (num < 10 ? '0' : '') + num;
    }

    // 获取当前的年、月、日、时、分、秒等信息
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // 月份是从0开始的，所以要加1
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    // 格式化日期时间字符串，以便显示
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  // 转换时间
  returnTime(date) {
    // 创建一个 Date 对象，它会自动获取当前的日期时间
    const now = new Date(date);

    function padZero(num) {
      return (num < 10 ? '0' : '') + num;
    }

    // 获取当前的年、月、日、时、分、秒等信息
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // 月份是从0开始的，所以要加1
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    // 格式化日期时间字符串，以便显示
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
};
