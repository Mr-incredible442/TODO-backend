const mongoose = require('mongoose');

const StoreProductsSchema = new mongoose.Schema({
  code: { type: Number },
  price: { type: Number },
  name: { type: String },
  ostock: { type: Number },
  received: { type: Number },
  issued: { type: Number },
  damage: { type: Number },
  cstock: { type: Number },
});

module.exports = mongoose.model('StoreProducts', StoreProductsSchema);
