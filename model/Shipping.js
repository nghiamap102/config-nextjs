const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema(
    {
        weight: { type: Number, require: true },
        size: { type: Object, required: true },
        shipping_type: { type: Object, required: false }
    }
);

module.exports = mongoose.model('shipping', shippingSchema)
