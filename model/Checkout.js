const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema(
    {
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Checkout', checkoutSchema)
