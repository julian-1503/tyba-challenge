"use strict";

const ListUsers = require("../../application/use_cases/ListUsers");
const CreateUser = require("../../application/use_cases/CreateUser");
const GetUser = require("../../application/use_cases/GetUser");
const DeleteUser = require("../../application/use_cases/DeleteUser");

module.exports = {
  async createUser(req, res) {
    const serviceLocator = req.serviceLocator;

    const { firstName, lastName, email, password } = req.body;

    try {
      const user = await CreateUser(
        firstName,
        lastName,
        email,
        password,
        serviceLocator
      );

      res.status(201).json(serviceLocator.userSerializer.serialize(user));
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  async findUsers(req, res) {
    const serviceLocator = req.serviceLocator;

    try {
      const users = await ListUsers(serviceLocator);

      res.status(200).json(users.map(serviceLocator.userSerializer.serialize));
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  async getUser(req, res) {
    const serviceLocator = req.serviceLocator;

    const userId = req.params.id;

    try {
      const user = await GetUser(userId, serviceLocator);

      if (user) {
        return res.sendStatus(404);
      }

      res.status(200).json(serviceLocator.userSerializer.serialize(user));
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  async deleteUser(req, res) {
    const serviceLocator = req.serviceLocator;

    const userId = req.params.id;

    try {
      await DeleteUser(userId, serviceLocator);

      res.status(204).json(userId);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};
