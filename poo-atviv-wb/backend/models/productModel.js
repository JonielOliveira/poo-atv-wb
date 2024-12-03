const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  percentage: { type: Number, default: 0 },
  amount: { type: Number, default: 0 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['product', 'service'], default: 'product', requiered: true},
  category: { type: String, required: true },
  images: { type: [String], required: true },
  tags: { type: [String], default: [] },
  brand: { type: String, required: true },
  discount: { type: discountSchema, default: {} },
  dateAdded: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);