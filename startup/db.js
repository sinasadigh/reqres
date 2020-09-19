const { Sequelize } = require("sequelize");
const config = require("config");

  module.exports = new Sequelize("reqres", "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
  });


