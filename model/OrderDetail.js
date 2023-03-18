const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema(
    {
        order_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: false },
        sample_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', require: true },
        // shipping: { type: Number, require: true, default: 0 },
        description: { type: String, require: false },
    }
);

module.exports = mongoose.model('order_details', orderDetailSchema)