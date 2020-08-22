"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serviceLocator = require("../../infrastructure/config/service-locator");

const userRouter = require("../../interfaces/routes/users");

const createServer = async () => {
  const port = process.env.PORT || 3000;

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(serviceLocator);

  app.use("/api", userRouter());

  await app.listen(port);
};

module.exports = createServer;
