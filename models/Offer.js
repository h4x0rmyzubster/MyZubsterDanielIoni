const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availableFrom: {
    type: Date,
    default: Date.now
  },
  availableTo: {
    type: Date
  },
  availableDays: {
    type: [Number],
    default: [1, 2, 3, 4, 5]
  },
  timeSlot: {
    type: String,
    enum: ['mattina', 'pomeriggio', 'sera', 'tutto il giorno'],
    default: 'tutto il giorno'
  },
  status: {
    type: String,
    enum: ['attiva', 'prenotata', 'completata', 'cancellata'],
    default: 'attiva'
  },
  note: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

OfferSchema.index({ user: 1 });
OfferSchema.index({ skill: 1 });
OfferSchema.index({ status: 1 });
OfferSchema.index({ availableFrom: 1 });

module.exports = mongoose.model('Offer', OfferSchema);