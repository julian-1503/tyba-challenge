"use strict";

const express = require("express");

const UsersController = require("../controllers/UsersController");

const authorization = require("../middlewares/authorization");

module.exports = () => {
  const Router = express.Router();

  Router.route("/users")
    .get(authorization, UsersController.findUsers)
    .post(UsersController.createUser);

  Router.use("/users/:id", authorization);

  Router.route("/users/:id")
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser);

  return Router;
};
