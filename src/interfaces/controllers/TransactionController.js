"use strict";

const ListTransactionsByUserId = require("../../application/use_cases/ListTransactionsByUserId");

module.exports = {
  async findByUserId(req, res) {
    const serviceLocator = req.serviceLocator;

    console.log(">>>>>. req", req.url);

    const { id } = req.params;

    try {
      const transactions = await ListTransactionsByUserId(id, serviceLocator);

      res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
};
