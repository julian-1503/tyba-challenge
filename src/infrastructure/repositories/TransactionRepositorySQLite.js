"use strict";

const sequelize = require("../orm/sequelize/sequelize");
const Transaction = require("../../domain/Transaction");
const TransactionRepository = require("../../domain/TransactionRepository");

module.exports = class extends TransactionRepository {
  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model("transaction");
  }

  async persist(transactionEntity) {
    const { uri, method, userId } = transactionEntity;
    const seqUser = await this.model.create({
      uri,
      method,
      userId
    });

    await seqUser.save();

    return new Transaction(
      seqUser.id,
      seqUser.uri,
      seqUser.method,
      seqUser.userId
    );
  }

  async findByUserId(userId) {
    const seqTransaction = await this.model.find({ where: { userId } });

    return seqTransaction.map(seqTransaction => {
      return new Transaction(
        seqTransaction.id,
        seqTransaction.uri,
        seqTransaction.method,
        seqTransaction.userId
      );
    });
  }
};
