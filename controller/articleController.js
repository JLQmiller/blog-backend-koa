const Article = require('../models/article.db');

/**
 * 创建文章
 * @param {*} ctx 
 * @api接口：
 *  title: string
 *  content: string
 *        
 */
const createArticle = async (ctx) => {
  console.log(`create req-body: ${ctx.request.body}`);
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const createTime = new Date();
  const publish = ctx.request.body.publish;
  if (title === '') {
    ctx.throw(400, '标题不能为空');
  }
  if (content === '') {
    ctx.throw(400, '文章内容不能为空');
  }
  const articleInfo = new Article({
    title,
    content,
    createTime,
  });
  let createResult = await articleInfo.save().catch(err => {
    ctx.throw(500, '服务器出错');
  });
  console.log(`createResult: ${createResult}`);
  // todo 关联tag
  // await Article.populate(createResult, { path: 'tages' }, (err, res) => {
  //   createResult = res;
  // });
  console.log('文章创建成功');
  ctx.body = {
    success: true,
    article: createResult,
  };
}

// 根据页码查询文章
const findPaging = (pageNumber, pageSize) => {
  console.log('start findArticles');
  return new Promise((resolve, reject) => {
    Article.find({})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createTime: -1 })
    .exec((err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};

// 查询所有文章
const findAllArticles = async (ctx) => {
  console.log('查找所有文章');
  console.log(`getArticle-body: ${ctx.request.body}`);
  let pageNumber = ctx.request.body.pageNumber;
  let pageSize = ctx.request.body.pageSize;
  let doc = await findPaging(pageNumber, pageSize);
  console.log(doc);
  console.log('文章为空');
  ctx.status = 200;
  ctx.body = {
    body: doc,
  };
}

// 应发布文章分页
const findPublishPaging = (pageNumber, pageSize) => {
  console.log('start findArticles');
  return new Promise((resolve, reject) => {
    Article.find({ publish: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createTime: -1 })
    .exec((err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};

// 获取所有应发布文章
const findAllPublishArticles = async (ctx) => {
  console.log('查找所有应发表文章');
  let pageNumber = ctx.request.body.pageNumber;
  let pageSize = ctx.request.body.pageSize;
  let doc = await findPublishPaging(pageNumber, pageSize);
  console.log(doc);
  ctx.status = 200;
  ctx.body = {
    body: doc,
  };
}

// 修改特定文章
const modifyArticle = async (ctx) => {
  console.log('开始修改某篇文章');
  const id = ctx.params.id;
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  // const publish = ctx.request.body.publish;
  if (title === '') {
    ctx.throw(400, '文章标题不能为空')
  }
  if (content === '') {
    ctx.throw(400, '文章内容不能为空');
  }
  console.log(ctx.request.body)
  await Article.findByIdAndUpdate(id, {$set: ctx.request.body}).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务器错误');
    }
  });
  ctx.body = {
    success: true,
  };
}

// 获取特定文章
const getSpecArticle = async (ctx) => {
  const id = ctx.params.id;
  if (id === '') {
    ctx.throw(400, 'id不能为空');
  }
  const article = await Article.findById(id).catch(err => {
    if (err.name === 'CastError' ) {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务器内部错误');
    }
  });
  console.log(article);
  ctx.body = {
    success: true,
    article: article,
  }
}

// 删除特定文章
const deleteArticle = async (ctx) => {
  const id = ctx.params.id;
  const article = await Article.findByIdAndRemove(id).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务内部错误');
    }
  });
  ctx.body = {
    success: true,
  };
}

// 将某篇文章状态设置为发布
const publishArticle = async (ctx) => {
  const id = ctx.params.id;
  const article = await Article.findByIdAndUpdate(id, { $set: {publish: true}}).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务器出错');
    }
  });
  ctx.body = {
    success: true,
  };
}

// 将某篇文章状态设置为未发布
const notPublishArticle = async (ctx) => {
  const id = ctx.params.id;
  const article = await Article.findByIdAndUpdate(id, {$set: {publish: false}}).catch(err => {
    if (err.name === 'CastError') {
      ctx.throw(400, 'id不存在');
    } else {
      ctx.throw(500, '服务器错误');
    }
  });
  ctx.body = {
    success: true,
  };
}

module.exports = {
  createArticle,
  findAllArticles,
  findAllPublishArticles,
  modifyArticle,
  getSpecArticle,
  deleteArticle,
  publishArticle,
  notPublishArticle,
};