const express = require('express');

const router = express.Router()
const Role = require('../model/Role');
const { verifyAdmin, verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', [verifyToken, isAdmin], async (req, res) => {
    CartModel.find().then((data) => {
        return res.status(200).json({
            success: true,
            data: data,
        });
    })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
})

router.post('/role', [verifyToken, isAdmin], async (req, res) => {
    const role = new Role(req.body)
    try {
        const data = await role.save();
        res.status(200).json({
            success: true,
            message: 'success',
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err,
        });
    }
})


module.exports = router;

