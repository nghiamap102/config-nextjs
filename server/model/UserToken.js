const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { jwtRefreshExpiration } = require('../config/constant');

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expire_date: Date,
});


RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + jwtRefreshExpiration
    );

    const _token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: jwtRefreshExpiration });
    let _object = new this({
        token: _token,
        user_id: user._id,
        expire_date: expiredAt.getTime(),
    });

    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expire_date.getTime() < new Date().getTime();
}


module.exports = mongoose.model('user_token', RefreshTokenSchema)
