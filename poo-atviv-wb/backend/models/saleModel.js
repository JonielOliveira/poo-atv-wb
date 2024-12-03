const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema de venda
const saleSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId, // Referência ao cliente
    ref: 'User', // Nome do modelo de cliente
    required: true
  },
  product: {
    type: Schema.Types.ObjectId, // Referência ao produto
    ref: 'Product', // Nome do modelo de produto
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number, // O preço total, calculado como quantity * price (considerando descontos)
    required: true
  },
  saleDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String, // Ex: "paid", "pending", "failed"
    required: true,
    enum: ['paid', 'pending', 'failed'],
    default: 'pending'
  },
  discountApplied: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String, // Ex: "credit card", "paypal", "bank transfer"
    required: true
  }
});

module.exports = mongoose.model('Sale', saleSchema);
