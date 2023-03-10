
var {DataTypes,Model} = require('sequelize');
const sequelize = require("../config/database");
const Article = require('../article/article.model');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
},{
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'user', // We need to choose the model name
  timestamps: false
});


User.hasMany(Article,{foreignKey: 'userId'});
Article.belongsTo(User);


module.exports = User;
