const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Types.ObjectId, require: true },
        rate: { type: Number, require: true },
        content: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('checkout', checkoutSchema)
