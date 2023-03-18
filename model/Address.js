const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
    {
        phone: String,
        name: String,
        default: Boolean,
        address_name: String,
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        location: {
            province: { name: String, codename: String },
            district: { name: String, codename: String },
            ward: { name: String, codename: String },
            no: String,
        }
    }
);

module.exports = mongoose.model('address', addressSchema)
