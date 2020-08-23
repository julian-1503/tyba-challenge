"use strict";

const express = require("express");

const TransactionController = require("../controllers/TransactionController");

const authorization = require("../middlewares/authorization");
const transaction = require("../middlewares/transaction");

module.exports = () => {
  const Router = express.Router();

  Router.get(
    "/users/:id/transactions/",
    authorization,
    transaction,
    TransactionController.findByUserId
  );

  return Router;
};
