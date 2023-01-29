const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: Number, required: false, unique: false },
        email: { type: String, required: true },
        password: { type: String, require: true },
        user_type: { type: String, require: false, default: 'user' },
        sex: { type: String, require: false },
        date_of_birth: { type: Date, require: false }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', productSchema)
