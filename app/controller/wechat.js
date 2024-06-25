const { Controller } = require('egg');
const wechat = require('co-wechat');
const crypto = require('crypto');
const parseString = require('xml2js').parseString;

class WechatController extends Controller {
  #userName;
  #createTime;
  #toUserName;
  #toFromName;
  #msgType;
  #event;
  #content;
  #userId = {
    'o0jYk6ARUKSF_hzHKt2icbVeC8Lg': '小罗宝贝'
  };

  async index() {
    const { ctx, app } = this;
    const query = ctx.request.query;

    const signature = query.signature;
    const timestamp = query.timestamp;
    const nonce = query.nonce;

    const echostr = query.echostr;
    if (await this.check(timestamp, nonce, signature, app.config.wx_id.token)) {
      this.ctx.body = echostr;
    } else {
      this.ctx.body = 'It is not from weixin';
    }
  };

  async check(timestamp, nonce, signature, token) {
    const tmp = [ token, timestamp, nonce ].sort()
      .join('');
    const currSign = crypto.createHash('sha1')
      .update(tmp)
      .digest('hex');
    return (currSign === signature);
  }

  //获取
  async getMessage() {
    const { ctx } = this;

    const xml = this.ctx.request.body;
    await (() => new Promise((resolve, reject) => {
      parseString(xml, async (err, result) => {
        if (err) {
          ctx.logger.error('wechatmsg-error', err);
        }
        //xml的信息
        const xmlData = result.xml;
        ctx.logger.info('wechatData', xmlData);
        this.#createTime = Date.parse(new Date());
        this.#toUserName = xmlData.ToUserName[0]; // 开发人员微信号
        this.#toFromName = xmlData.FromUserName[0]; // 发送方帐号（一个OpenID）
        this.#msgType = xmlData.MsgType[0]; // 消息类型，event
        this.#event = xmlData.Event ? xmlData.Event[0] : ''; // 事件类型，subscribe(订阅)、unsubscribe(取消订阅)
        this.#content = xmlData.Content ? xmlData.Content[0] : '';//消息


        this.#userName = this.#userId[this.#toFromName] || '';
        switch (this.#msgType) {
          case 'image':
            ctx.body = `<xml>
                             <ToUserName><![CDATA[${this.#toFromName}]]></ToUserName>
                             <FromUserName><![CDATA[${this.#toUserName}]]></FromUserName>
                             <CreateTime>${this.#createTime}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[暂时还不可以发照片哦！]]></Content>
                        </xml>`;
            break;
          case 'text':
            if (this.#content.indexOf('天气') >= 0 ||
              this.#content.indexOf('温度') >= 0 ||
              this.#content.indexOf('气温') >= 0 ||
              this.#content.indexOf('湿度') >= 0 ||
              this.#content.indexOf('晒') >= 0 ||
              this.#content.indexOf('冷') >= 0 ||
              this.#content.indexOf('热') >= 0) {
              await this.getTheWeather();
            } else if (this.#content.indexOf('好') >= 0) {
              ctx.body = `<xml>
                             <ToUserName><![CDATA[${this.#toFromName}]]></ToUserName>
                             <FromUserName><![CDATA[${this.#toUserName}]]></FromUserName>
                             <CreateTime>${this.#createTime}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[好的${this.#userName}💐💐]]></Content>
                        </xml>`;
            } else {
              ctx.body = `<xml>
                             <ToUserName><![CDATA[${this.#toFromName}]]></ToUserName>
                             <FromUserName><![CDATA[${this.#toUserName}]]></FromUserName>
                             <CreateTime>${this.#createTime}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[好]]></Content>
                        </xml>`;
            }
            break;
          default:
            ctx.body = `<xml>
                             <ToUserName><![CDATA[${this.#toFromName}]]></ToUserName>
                             <FromUserName><![CDATA[${this.#toUserName}]]></FromUserName>
                             <CreateTime>${this.#createTime}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[听又听不懂学又学不会]]></Content>
                        </xml>`;
        }
        resolve();
      });

    }))();
  }


  async getTheWeather() {
    const { ctx, app } = this;
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${app.config.gaode.key}&city=${510100}&output=JSON&extensions=base`;
    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    const iconList = {
      '晴': '☀️',
      '少云': '🌤️',
      '多云': '🌤️',
      '晴间多云': '🌤️',
      '雪': '❄️',
      '雨': ' 🌦️'
    };
    if (res.data.infocode === '10000') {
      const live = res.data.lives[0];
      ctx.body = `<xml>
                             <ToUserName><![CDATA[${this.#toFromName}]]></ToUserName>
                             <FromUserName><![CDATA[${this.#toUserName}]]></FromUserName>
                             <CreateTime>${this.#createTime}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[${this.#userName}
今天${live.province}${live.city}
天气${live.weather}-${iconList[live.weather] || '🤷‍♂️'}
温度${live.temperature_float}℃-🌡️
湿度${live.humidity_float}-💧
风向${live.winddirection}-🎐
风力${live.windpower}-🍃]]></Content>
                        </xml>`;
    } else {
      ctx.body = `<xml>
                             <ToUserName><![CDATA[${this.#toFromName}]]></ToUserName>
                             <FromUserName><![CDATA[${this.#toUserName}]]></FromUserName>
                             <CreateTime>${this.#createTime}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[天气获取失败]]></Content>
                        </xml>`;
    }
  }

  //测试用
  async test() {
    console.log('调用');
    // await this.getTheWeather();
    // this.ctx.logger.debug('debug info');
    // this.ctx.logger.info('some requrest data: %j', this.ctx.request.body);
    // this.ctx.logger.warn('警告！！！！！');
    // this.ctx.logger.error('这是个失败的操作');
    // this.ctx.body = 'logger测试信息';
  }
}


module.exports = WechatController;
