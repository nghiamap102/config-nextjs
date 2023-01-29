const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    video: { type: String, required: false },
    image: { type: Array, required: true },
    brand: { type: String, require: true },
    type: { type: String },
    description: { type: String }
  },
);

module.exports = mongoose.model('product', productSchema)
