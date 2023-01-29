const mongoose = require('mongoose')

const productTypeSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true, unique: true },
        category: { type: Array, required: true }
    }
);

module.exports = mongoose.model('product_type', productTypeSchema)
