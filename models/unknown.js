const Sequelize = require("sequelize");
const db = require("../startup/db");
const Unknown = db.define("unknown", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  color: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pantone_value: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

exports.Unknown = Unknown;

