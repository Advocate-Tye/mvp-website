const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  invite: String,
  uses: Number
});

const Referral = mongoose.model('Referral', ReferralSchema);

module.exports = Referral;
