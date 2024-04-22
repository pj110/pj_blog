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
    const list = await this.app.mysql.select('zhaobiao_data', {
      where: {
        type: data.type,
      },
      orders: [ [ 'time', 'desc' ] ],
      limit: data.pageSize,
      offset: (data.page - 1) * data.pageSize,
    });
    const total = await this.app.mysql.count('zhaobiao_data', { type: data.type });

    return {
      list,
      total,
    };
  }

  async goodListAll(data) {
    const list = await this.app.mysql.select('zhaobiao_data', {
      where: {
        type: [ 1, 2 ],
      },
      orders: [ [ 'time', 'desc' ] ],
      limit: data.pageSize,
      offset: (data.page - 1) * data.pageSize,
    });
    const total = await this.app.mysql.count('zhaobiao_data', { type: [ 1, 2 ] });

    return {
      list,
      total,
    };
  }

  async goodById(id) {
    const mydata = await this.app.mysql.get('zhaobiao_data', { id: id });
    const mySon = await this.app.mysql.select('zhaobiao_data', {
      where: {
        pid: id,
      },
    });
    const views = mydata.views + 1;
    await this.app.mysql.update('zhaobiao_data', {
      id,
      views,
    });
    mydata.son = mySon;
    return mydata;

  }

}

module.exports = goodService;
