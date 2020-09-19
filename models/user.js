const Sequelize = require("sequelize");
const db = require("../startup/db");
const argon2 = require("argon2");
const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: {
      args: true,
      msg: "ایمیل تکراری میباشد!",
    },
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  job: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
const comparePassword = async function (password, userPass) {
  const compare = await argon2.verify(userPass, password);
  return compare;
};
const hashPassword = async function (password) {
  const hash = await argon2.hash(password);
  return hash;
};
exports.User = User;
exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
