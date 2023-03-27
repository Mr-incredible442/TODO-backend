const mongoose = require('mongoose');

const restaurantCreditSchema = new mongoose.Schema({
  description: { type: String },
  amount: { type: Number },
});

module.exports = mongoose.model('RestaurantCredit', restaurantCreditSchema);
