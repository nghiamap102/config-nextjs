const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: false, unique: false, default: null },
        email: { type: String, required: true },
        password: { type: String, require: true },
        role: { type: mongoose.Types.ObjectId, ref: 'roles', require: false, default: 'user' },
        sex: { type: String, require: false },
        date_of_birth: { type: Date, require: false },
        avatar: { type: mongoose.Types.ObjectId, require: false },
    },
    {
        timestamps: true,
    }
);
// define method funct to use for mongoose func
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

module.exports = mongoose.model('user', userSchema)
