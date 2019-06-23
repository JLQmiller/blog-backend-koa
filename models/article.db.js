const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;
const article = {
  title: String,
  content: String,
  creatTime: {
    type: Date,
  }
}
// 生成文章信息模板
const articleSchema = new Schema(article);

// 创造articleSchema的实例Article
module.exports = mongoose.model('Article', articleSchema);

