const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true, unique: true },
        // userId: { type: String, required: true },
        quantity: { type: Number, required: false },
        unitPrice: { type: Number },
        type: { type: Object, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Cart', cartSchema)
