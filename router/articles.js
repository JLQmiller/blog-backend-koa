const Router = require('koa-router');
const router = new Router({prefix: '/article'});
const verify = require('../token/auth.service');
const Article = require('../controller/articleController');

router.get('/fetch', Article.findAllArticles) // 所有文章
      .post('/create', verify, Article.createArticle) // 创建新文章
      .patch('/modify/:id', verify, Article.modifyArticle) // 修改文章
      .get('/fetchSingle/:id', Article.getSpecArticle) // 获取某文章
      .delete('/delete/:id', Article.deleteArticle) // 删除某文章
      .get('/publishArticles', Article.findAllPublishArticles); // 所有应该发布的文章

// todo 设置是否应该发布的接口未做

module.exports = router;
