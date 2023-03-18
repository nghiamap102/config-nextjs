const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true, unique: true },
        quantity: { type: Number, required: false },
        sample_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product_sample', required: true, unique: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        // user_id: { type: String, required: true },
        category: { type: Array, require: true },
        active: { type: Boolean, default: true }
    }
);

module.exports = mongoose.model('cart', cartSchema)
