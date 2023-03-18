const express = require('express');

const router = express.Router()
const ProductTypeModel = require('../model/ProductType');


router.get('/:page', async (req, res) => {
    const { page } = req.params
    ProductTypeModel.find().limit(5)
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
    const data = new ProductTypeModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;

