const express = require('express');

const router = express.Router()
const ProductDetailModel = require('../model/ProductDetail');

router.get('/', async (req, res) => {
    ProductDetailModel.find()
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
    
})



module.exports = router;

