const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        video: { type: String, required: false },
        image: { type: Array, required: true },
        brand: { type: String, require: true },
        description: { type: String }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', productSchema)
