const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema(
    {
        cart_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carts', require: true, min: 1 }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('checkout', checkoutSchema)
