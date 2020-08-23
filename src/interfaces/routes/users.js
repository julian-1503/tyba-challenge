"use strict";

const express = require("express");

const UsersController = require("../controllers/UsersController");

const authorization = require("../middlewares/authorization");
const transaction = require("../middlewares/transaction");

module.exports = () => {
  const Router = express.Router();

  Router.route("/users")
    .get(authorization, transaction, UsersController.findUsers)
    .post(UsersController.createUser);

  Router.use("/users/:id", authorization, transaction);

  Router.route("/users/:id")
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser);

  return Router;
};
