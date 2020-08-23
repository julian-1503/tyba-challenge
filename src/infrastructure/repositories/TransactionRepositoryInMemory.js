"use strict";

const Transaction = require("../../domain/Transaction");
const TransactionRepository = require("../../domain/TransactionRepository");

module.exports = class extends TransactionRepository {
  async _initializeRepositoryWithTwoTransactions() {
    const john = new Transaction(null, "/api/oauth/token", "get", 0);
    const jane = new Transaction(null, "/api/oauth/token", "post", 1);
    await this.persist(john);
    await this.persist(jane);
  }

  _dataAsArray(userId) {
    return Object.keys(this.data)
      .map(key => this.data[key])
      .filter(item => item.userId === userId);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
    this._initializeRepositoryWithTwoUsers();
  }

  persist(transactionEntity) {
    const row = Object.assign({}, transactionEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return Promise.resolve(row);
  }

  findByUserId(userId) {
    return Promise.resolve(this._dataAsArray(userId));
  }
};
