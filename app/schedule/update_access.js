module.exports = (app) => {
  return {
    schedule: {
      type: 'worker',
      cron: '0 45 19 * * *',
      // interval: '60s',
      immediate: true
    },
    async task(ctx) {
      const res = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${app.config.wx_id.appid}&secret=${app.config.wx_id.secret}`, {
        dataType: 'json',
      });
      console.log(res.data);
      ctx.app.cache = res.data;
      /**
       *  {
       *   access_token: '',
       *   expires_in:
       * }
       *
       * **/
    },
  };
};
