const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    enum: ['XMR', 'credit'],
    default: 'XMR'
  },
  type: {
    type: String,
    enum: ['pagamento', 'credito', 'rimborso', 'fee'],
    default: 'pagamento'
  },
  paymentId: {
    type: String
  },
  recipientAddress: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  confirmedAt: {
    type: Date
  },
  transactionHash: {
    type: String
  },
  confirmations: {
    type: Number,
    default: 0
  },
  note: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

TransactionSchema.index({ fromUser: 1, toUser: 1 });
TransactionSchema.index({ order: 1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ paymentId: 1 });
TransactionSchema.index({ transactionHash: 1 });

module.exports = mongoose.model('Transaction', TransactionSchema);