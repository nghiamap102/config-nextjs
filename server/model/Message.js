const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        sender_id: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
        chat_id: { type: mongoose.Types.ObjectId, ref: 'chats', require: true },
        content: { type: String, require: true },
        unread: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('message', messageSchema)
