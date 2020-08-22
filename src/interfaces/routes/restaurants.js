"use strict";

const express = require("express");

const RestaurantsController = require("../controllers/RestaurantsController");

const authorization = require("../middlewares/authorization");

module.exports = () => {
  const Router = express.Router();

  Router.route("/restaurants").get(
    authorization,
    RestaurantsController.findNear
  );

  return Router;
};
