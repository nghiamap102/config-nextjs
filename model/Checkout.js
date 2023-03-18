const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema(
    {
        items: [{
            product_id: { type: mongoose.Types.ObjectId, require: true },
            sample_id: { type: mongoose.Types.ObjectId, require: true },
            quantity: Number,
            _id: false
        }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('checkout', checkoutSchema)
