const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true },
        product_type_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product_types', require: true }],
        image: { type: String, require: true },
        unit_price: { type: Number, require: true },
        count_in_stock: { type: Number, require: true },
    }
);

module.exports = mongoose.model('product_sample', productSchema)
