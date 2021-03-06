"use strict";

const express = require("express");

const RestaurantsController = require("../controllers/RestaurantsController");

const authorization = require("../middlewares/authorization");
const transaction = require("../middlewares/transaction");

module.exports = () => {
  const Router = express.Router();

  Router.route("/restaurants").get(
    authorization,
    transaction,
    RestaurantsController.findNear
  );

  return Router;
};
