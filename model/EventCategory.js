const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        category_parent_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    }
);

module.exports = mongoose.model('event_category', categorySchema)
