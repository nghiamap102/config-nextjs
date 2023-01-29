const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true },
        image: { type: String, require: true },
        sample: { type: Array, required: true },
    }
);

module.exports = mongoose.model('product_sample', productSchema)
