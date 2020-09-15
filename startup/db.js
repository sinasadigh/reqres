const { Sequelize } = require("sequelize");
const config = require("config");
module.exports = async function () {
  const sequelize = new Sequelize("reqres", "postgres", "123", {
    host: "localhost",
    dialect: "postgres",
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("eorr" + err);
    });
};
