const mongoose = require('mongoose')

const voucherSchema = new mongoose.Schema(
    {
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('voucher', voucherSchema)
