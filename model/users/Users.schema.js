const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  number: { type: Number, unique: true, min: 9 },
  name: { type: String },
  password: { type: String, min: 5 },
  role: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
