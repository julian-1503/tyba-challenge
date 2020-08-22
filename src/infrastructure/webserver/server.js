"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const createServer = async () => {
  const port = process.env.PORT || 3000;

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.listen(port);
};

module.exports = createServer;
