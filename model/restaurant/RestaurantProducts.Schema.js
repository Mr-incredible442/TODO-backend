const mongoose = require('mongoose');

const restaurantProductSchema = new mongoose.Schema({
  code: { type: Number },
  price: { type: Number },
  name: { type: String },
  ostock: { type: Number },
  received: { type: Number },
  damage: { type: Number },
  cstock: { type: Number },
  section: { type: String },
});

module.exports = mongoose.model('RestaurantProduct', restaurantProductSchema);
