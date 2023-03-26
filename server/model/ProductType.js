const mongoose = require('mongoose')

const productTypeSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true, unique: false },
        title: { type: String, require: true },
        cat_content: { type: String, required: true },
        cat_group: { type: Number },
    }
);

module.exports = mongoose.model('product_type', productTypeSchema)
