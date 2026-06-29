const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'users',
  strict: false,
  versionKey: false
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
