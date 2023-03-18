const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema(
    {
        creator_id: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
        members: [{ type: String }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('chat', channelSchema)
