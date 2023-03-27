const mongoose = require('mongoose');

const restaurantTopupSchema = new mongoose.Schema({
  busName: { type: String },
  name: { type: String },
  amount: { type: Number },
});

module.exports = mongoose.model('RestaurantTopup', restaurantTopupSchema);
