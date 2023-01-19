const mongoose = require('mongoose')

const productTypeSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        category: { type: Array }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('producttype', productTypeSchema)
