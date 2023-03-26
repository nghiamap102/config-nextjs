const express = require('express');

const router = express.Router()
const UserModel = require('../model/User');
const UserTokenModel = require('../model/UserToken');
const RefreshToken = require('../model/UserToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const { jwtExpiration, jwtRefreshExpiration } = require('../config/constant');


router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const user = new UserModel(req.body);
        await user.save();
        res.status(200).json({
            success: true,
            message: 'success',
            data: user,
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});


router.get('/user/:user_id', async (req, res) => {
    try {
        const user = await UserModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.user_id) },
            },
            {
                $lookup: {
                    from: "roles", localField: "role", foreignField: "_id", as: "role",
                    pipeline: [
                        { $project: { __v: 0 } }
                    ]
                }
            },
            { $unwind: '$role' },
        ])
        res.status(200).json({
            success: true,
            data: user[0],
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});

router.patch('/user', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.body._id, req.body);
        console.log(req.body._id, req.body)
        res.status(200).json({
            success: true,
            message: 'update information success',
            data: user,
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await UserModel.aggregate([
            {
                $match: { email: email },
            },
            {
                $lookup: {
                    from: "roles", localField: "role", foreignField: "_id", as: "role",
                    pipeline: [
                        { $project: { __v: 0 } }
                    ]
                }
            },
            { $unwind: '$role' }
        ])
        const user = userData.length > 0 && userData[0] || {}
        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ accessToken: null, error: 'Invalid password' });
        }

        const accessToken = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, { expiresIn: jwtExpiration });
        const refreshToken = await RefreshToken.createToken(user);
        res.status(200).json({
            success: true,
            message: 'success',
            data: { user, access_token: accessToken, refresh_token: refreshToken },
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/refresh_token', async (req, res) => {
    const { refresh_token: requestToken } = req.body;
    if (!requestToken) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
        const user = await UserModel.findById(refreshToken.user_id);
        console.log(user)
        if (!refreshToken) {
            res.status(403).json({ message: "Invalid refresh token!" });
            return;
        }

        RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
        // if (RefreshToken.verifyExpiration(refreshToken)) {

        //     res.status(403).json({
        //         message: "Refresh token was expired. Please make a new signin request",
        //     });
        //     return;
        // }

        let newAccessToken = jwt.sign({ id: refreshToken.user_id }, process.env.JWT_SECRET, {
            expiresIn: jwtRefreshExpiration,
        });

        const newRefreshToken = await RefreshToken.createToken(user);

        return res.status(200).json({
            success: true,
            data: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.user_id)
        console.log(user)
        if (user) {
            const userToken = await UserTokenModel.findOneAndRemove({ user_id: user._id })
            res.status(200).json({
                success: true,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
const otplib = require('otplib')
const qrcode = require('qrcode');
const { default: mongoose } = require('mongoose');
const { authenticator } = otplib
const generateOTPToken = (username, serviceName, secret) => {
    return authenticator.keyuri(username, serviceName, secret)
}
const verifyOTPToken = (token, secret) => {
    return authenticator.verify({ token, secret })
    // return authenticator.check(token, secret)
}

const generateUniqueSecret = () => {
    return authenticator.generateSecret()
}
const generateQRCode = async (otpAuth) => {
    try {
        const QRCodeImageUrl = await qrcode.toDataURL(otpAuth)
        return `<img src='${QRCodeImageUrl}' alt='qr-code-img-trungquandev' />`
    } catch (error) {
        console.log('Could not generate QR code', error)
        return
    }
}
router.post('/generate_otp', async (req, res) => {
    try {
        const otpAuth = generateOTPToken('nghiamap102', 'condimemay', 'memay')
        const QRCodeImage = await generateQRCode(otpAuth)
        res.status(200).json({
            success: true,
            message: 'success',
            data: QRCodeImage
        });
    } catch (error) {
        res.status(501).send(error);
    }
});

module.exports = router;

