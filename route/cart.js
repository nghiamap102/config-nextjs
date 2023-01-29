const express = require('express');

const router = express.Router()
const CartModel = require('../model/Cart');

router.get('/', async (req, res) => {
    CartModel.find().then((data) => {
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
    const data = new CartModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json({
            success: true,
            message: 'success',
            data: dataToSave,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: 'success',
            error: error,
        });
    }
})

router.patch('/', async (req, res) => {
    const data = req.body;
    CartModel.update({ _id: req.body._id }, { $set: data })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'cart is updated',
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
})

router.delete('/:itemId', async (req, res) => {
    const id = req.params.itemId;
    const cart = await CartModel.findById(id)
    if (cart) {
        CartModel.findByIdAndDelete(id)
            .then((data) => {
                res.status(200).json({
                    success: true,
                    message: 'item is deleted',
                });
            })
    } else {
        res.status(500).json({
            success: false,
            message: 'cart item is not exist',
        });
    }
})



router.get('/items', async (req, res) => {
    CartModel.aggregate([
        { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "product" } },
        { $lookup: { from: "product_types", localField: "product_id", foreignField: "product_id", as: "product_type" } },
        { $lookup: { from: "product_samples", localField: "product_id", foreignField: "product_id", as: "product_sample" } },
        { $unwind: "$product_type" },
        { $unwind: "$product" }
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


router.post('/delete_ids', async (req, res) => {
    CartModel.deleteMany({ _id: { $in: req.body } })
        .then((singleCourse) => {
            res.status(200).json({
                success: true,
                message: 'item is deleted',
            });
        }).catch(() => {
            res.status(500).json({
                success: false,
                message: 'cart item is not exist',
            });
        })
})


module.exports = router;
