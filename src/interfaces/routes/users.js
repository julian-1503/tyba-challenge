"use strict";

const express = require("express");

const UsersController = require("../controllers/UsersController");

module.exports = () => {
  const Router = express.Router();

  Router.route("/users")
    .get(UsersController.findUsers)
    .post(UsersController.createUser);

  Router.route("/users/:id")
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser);

  return Router;
};
