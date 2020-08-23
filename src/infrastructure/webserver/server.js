"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serviceLocator = require("../../infrastructure/config/service-locator");

const oauthRouter = require("../../interfaces/routes/oauth");
const userRouter = require("../../interfaces/routes/users");
const restaurantRouter = require("../../interfaces/routes/restaurants");
const transactionRouter = require("../../interfaces/routes/transactions");

const createServer = async () => {
  const port = process.env.PORT || 3000;

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(serviceLocator);

  app.use("/api", oauthRouter());
  app.use("/api", userRouter());
  app.use("/api", restaurantRouter());
  app.use("/api", transactionRouter());

  await app.listen(port);
};

module.exports = createServer;
