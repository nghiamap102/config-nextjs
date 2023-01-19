const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        unit_price: { type: Number, required: true },
        count_in_stock: { type: Number, required: true },
        category: { type: Object, required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('productdetail', productSchema)
