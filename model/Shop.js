const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: String,
        user_id: { type: mongoose.Types.ObjectId, ref: 'users', require: false, unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('shop', shopSchema)
