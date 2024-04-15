/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.good.index);
  router.post('/goodAdd', controller.good.goodAdd);// 添加商品
  router.get('/goodDel', controller.good.goodDel);// 商品删除
  router.post('/goodUpdate', controller.good.goodUpdate);// 商品更新
  router.get('/goodList', controller.good.goodList);// 获取商品指定type列表
  router.get('/goodListAll', controller.good.goodListAll);// 获取所有商品列表
  router.get('/goodById', controller.good.goodById);// 根据id获取商品详情
  router.post('/goodUpload', controller.good.goodUpload);// 上传文件

  router.get('/user/', controller.user.index);
  router.post('/user/add', controller.user.index);
  router.post('/user/login', controller.user.index);
};
