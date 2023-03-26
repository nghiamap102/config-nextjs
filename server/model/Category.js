const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        parent_id: { type: mongoose.Schema.Types.ObjectId, required: false, default: null },
        image: String
    }
);

module.exports = mongoose.model('category', categorySchema)
