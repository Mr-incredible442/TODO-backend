const mongoose = require('mongoose');

const restaurantReceivedSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId },
  code: { type: String },
  name: { type: String },
  quantity: { type: Number },
});

module.exports = mongoose.model('RestaurantReceived', restaurantReceivedSchema);
