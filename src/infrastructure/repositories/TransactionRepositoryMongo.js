"use strict";

const Transaction = require("../../domain/Transaction");
const MongooseTransaction = require("../orm/mongoose/schemas/Transaction");
const TransactionRepository = require("../../domain/TransactionRepository");

module.exports = class extends TransactionRepository {
  async persist(transactionEntity) {
    const { uri, method, userId } = transactionEntity;
    const mongooseTransaction = new MongooseTransaction({
      uri,
      method,
      userId
    });

    await mongooseTransaction.save();

    return new Transaction(
      mongooseTransaction.id,
      mongooseTransaction.uri,
      mongooseTransaction.method,
      mongooseTransaction.userId,
      mongooseTransaction.createdAt
    );
  }

  async findByUserId(userId) {
    const mongooseTransaction = await MongooseTransaction.find({ userId });
    return mongooseTransaction.map(mongooseTransaction => {
      return new Transaction(
        mongooseTransaction.id,
        mongooseTransaction.uri,
        mongooseTransaction.method,
        mongooseTransaction.userId,
        mongooseTransaction.createdAt
      );
    });
  }
};
