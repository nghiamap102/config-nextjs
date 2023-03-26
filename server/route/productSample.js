const express = require('express');

const router = express.Router()
const ProductSampleModel = require('../model/ProductSample');

router.get('/', async (req, res) => {
    ProductSampleModel.find()
        .then((data) => {
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

router.post('/', async (req, res) => {
    const data = new ProductSampleModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json({
            success: true,
            message: 'success',
            data: dataToSave,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



module.exports = router;

