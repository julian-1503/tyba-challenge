"use strict";

const constants = require("./constants");
const environment = require("./environment");
const JwtAccessTokenManager = require("../security/JwtAccessTokenManager");
const UserSerializer = require("../../interfaces/serializers/UserSerializer");
const PasswordEncryptor = require("../security/PasswordEncryptor");
const RestaurantsRepository = require("../../infrastructure/repositories/RestaurantsRepositoryOpenTable");

function buildBeans(req, _, next) {
  let beans = {
    accessTokenManager: new JwtAccessTokenManager(),
    userSerializer: new UserSerializer(),
    passwordEncryptor: new PasswordEncryptor(),
    RestaurantsRepository: new RestaurantsRepository()
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
    beans = {
      ...beans,
      userRepository: new UserRepositoryInMemory()
    };
  } else if (
    environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO
  ) {
    const UserRepositoryMongo = require("../repositories/UserRepositoryMongo");
    const TransactionRepositoryMongo = require("../repositories/TransactionRepositoryMongo");
    beans = {
      ...beans,
      userRepository: new UserRepositoryMongo(),
      transactionRepository: new TransactionRepositoryMongo()
    };
  } else {
    const UserRepositorySQLite = require("../repositories/UserRepositorySQLite");
    beans = {
      ...beans,
      userRepository: new UserRepositorySQLite()
    };
  }

  req.serviceLocator = beans;

  next();
}

module.exports = buildBeans;
