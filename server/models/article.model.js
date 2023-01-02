const {Model,DataTypes} = require('sequelize');
const sequelize = require("../helpers/database");

class Article extends Model {};

Article.init({
  content: {
    type: DataTypes.STRING
  },
},{
  sequelize,
  modelName: 'article',
  timestamps: false
})

module.exports = Article;
