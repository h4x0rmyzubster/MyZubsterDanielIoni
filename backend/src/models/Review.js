const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  authorId: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  targetUserId: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  skillId: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'rating must be an integer between 1 and 5'
    }
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

reviewSchema.index({ targetUserId: 1, createdAt: -1 });
reviewSchema.index({ skillId: 1, createdAt: -1 });
reviewSchema.index({ authorId: 1, targetUserId: 1, skillId: 1, createdAt: -1 });

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
