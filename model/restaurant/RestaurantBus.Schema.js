const mongoose = require('mongoose');

const restaurantBusSchema = new mongoose.Schema({
  busName: { type: String },
  name: { type: String },
  status: { type: String },
  amount: { type: Number },
});

module.exports = mongoose.model('RestaurantBus', restaurantBusSchema);
