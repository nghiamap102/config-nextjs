const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    video: { type: String, required: false },
    image: { type: Array, required: true },
    category: [{ type: String, require: true }],
    description: { type: String },
    active: { type: Boolean, require: false, default: true },
    sold: { type: Number, require: false, default: 0 },
    createdAt: { type: Date, required: true, default: Date.now }
  },
);

module.exports = mongoose.model('product', productSchema)
