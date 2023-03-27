const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String },
  kgs: [{ type: Number }],
  collectionDate: { type: String },
  date: { type: String },
  paid: { type: String },
  paidBy: { type: String },
});

module.exports = mongoose.model('Goats', supplierSchema);
