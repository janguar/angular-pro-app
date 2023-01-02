
var {DataTypes,Model} = require('sequelize');
const sequelize = require("../helpers/database");


class Role extends Model {}

Role.init({
  name: {
    type: DataTypes.STRING
  },
},{
  sequelize,
  modelName: 'roles',
  timestamps: false
})



module.exports = Role;
