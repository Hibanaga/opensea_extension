const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema({
  transactionHash: { type: String, text: true },
  date: { type: String, text: true },
  buyHash: { type: String, text: true },
  sellHash: { type: String, text: true },
  maker: { type: String, text: true },
  taker: { type: String, text: true },
  // topics: { type: Array },
});

module.exports = mongoose.model("transactions", transactionsSchema);
