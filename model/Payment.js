const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        total: { type: Number, require: true },
        payment_method: { type: String, require: true },
        status: { type: String, require: true, default: 'pending' },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('payment', paymentSchema)
