const mongoose = require('mongoose');

// const moment = require('moment');

const Schema = mongoose.Schema;
const articleSchema = {
  title: String,
  content: String,
  creatTime: {
    type: Date,
  },
  publish: Boolean,
}
// 生成文章信息数据结构Schema
const articleSchema = new Schema(article);

// 生成user模型model，将存在article集合中
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
