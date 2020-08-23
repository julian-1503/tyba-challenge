const mongoose = require("../mongoose");

const transactionSchema = new mongoose.Schema(
  {
    uri: String,
    method: String,
    userId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
