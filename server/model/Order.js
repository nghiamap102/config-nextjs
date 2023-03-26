
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        coin: { type: Number, require: true, default: 0 },
        status: { type: String, require: true, default: 'pending' },
        // infor_id: { type: Number, require: true, default: 0 },
        // shipping: { type: Number, require: true, default: 0 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('order', orderSchema)
