"use strict";

const Transaction = require("../../domain/Transaction");

module.exports = async (uri, method, userId, { transactionRepository }) => {
  const transaction = new Transaction(null, uri, method, userId);
  const result = await transactionRepository.persist(transaction);

  return result;
};
