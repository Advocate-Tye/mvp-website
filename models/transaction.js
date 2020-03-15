const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  business: String,

  uuid: String,

  amount: Number
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Business;
