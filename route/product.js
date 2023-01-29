const express = require('express');

const router = express.Router()
const productModel = require('../model/Product');

router.get('/', async (req, res) => {
    // router.get('/:userId', async (req, res) => {
    productModel.aggregate([
        { $lookup: { from: "product_samples", localField: "_id", foreignField: "product_id", as: "product_sample" } },
        { $lookup: { from: "product_types", localField: "_id", foreignField: "product_id", as: "product_type" } },
        { $unwind: '$product_type' },
    ])
        .then((data) => {
            res.status(200).json({
                success: true,
                message: 'success',
                data: data
            })
        })
        .catch(error => {
            res.json({ message: 'An error occured!' })
        })
})

router.post('/', async (req, res) => {
    const data = new productModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})




module.exports = router;

