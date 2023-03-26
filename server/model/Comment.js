const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        video: String,
        star: Number,
        content: { type: String },
        category: { type: Array, require: true },
        image: { type: Array, require: true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('comment', commentSchema)
