"use strict";

const express = require("express");

const AuthorizationController = require("../controllers/AuthorizationController");

module.exports = () => {
  const Router = express.Router();

  Router.post("/oauth/token", AuthorizationController.getAccessToken);

  return Router;
};
