const express = require("express");

const authRouter = require("../routes/auth");
const userRouter = require('../routes/user')
const unknownRouter = require('../routes/unknown')

module.exports = function (app) {
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/unknown", unknownRouter);
};
