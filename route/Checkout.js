const express = require('express');

const router = express.Router()
const CheckoutModel = require('../model/Checkout');

router.get('/', async (req, res) => {
    CheckoutModel.find().then((data) => {
        return res.status(200).json({
            success: true,
            message: 'success',
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

router.post('/', async (req, res) => {
    const data = new CheckoutModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;

