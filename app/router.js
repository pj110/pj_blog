/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.good.index);
  router.post('/goodAdd', controller.good.index);// 添加商品
  router.get('/goodDel', controller.good.index);// 商品删除
  router.post('/goodUpdate', controller.good.index);// 商品更新
  router.get('/goodList', controller.good.index);// 获取商品指定type列表
  router.get('/goodListAll', controller.good.index);// 获取所有商品列表
  router.get('/goodById', controller.good.index);// 根据id获取商品详情
  router.post('/goodUpload', controller.good.index);// 上传文件

  router.get('/user/', controller.user.index);
  router.post('/user/add', controller.user.index);
  router.post('/user/login', controller.user.index);
};
