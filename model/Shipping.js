const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema(
    {
        type: String,
        price: Number
    }
);

module.exports = mongoose.model('shipping', shippingSchema)
