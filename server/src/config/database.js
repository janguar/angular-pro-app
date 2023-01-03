const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
  "test-db","user","pass",{
  dialect: "sqlite",
  host: "./database-test.sqlite"
})

module.exports = sequelize;

