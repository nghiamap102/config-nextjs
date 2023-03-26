const express = require('express');

const router = express.Router()
const CartModel = require('../model/Cart');
const { default: mongoose } = require('mongoose');
const { verifyToken } = require('../middleware/auth');


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
            success: false,
            message: 'failed',
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

router.delete('/:item_id', async (req, res) => {
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



router.get('/:user_id', verifyToken, async (req, res) => {
    // router.get('/:user_id', verifyToken, async (req, res) => {
    CartModel.aggregate([
        {
            $match: { user_id: mongoose.Types.ObjectId(req.params.user_id) }
        },
        {
            $lookup: {
                from: "products", localField: "product_id", foreignField: "_id", as: "product",
                pipeline: [{ $project: { __v: 0 } }]
            }
        },
        {
            $lookup: {
                from: "product_samples", localField: "sample_id", foreignField: "_id", as: "product_sample",
                pipeline: [{ $project: { _id: 1, product_id: 0, product_type_id: 0, __v: 0 } }]
            }
        },
        { $unwind: "$product_sample" },
        { $unwind: "$product" },
        {
            $set: {
                category: {
                    $map: {
                        input: "$category",
                        as: "item",
                        in: {
                            $toObjectId: "$$item"
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "product_types", localField: "product_id", foreignField: "product_id", as: "product_type",
                pipeline: [{ $project: { _id: 1, product_id: 0, __v: 0 } }]
            }
        },
        {
            $project: {
                _id: 1,
                active: 1,
                product: 1,
                product_sample: 1,
                product_type: 1,
                quantity: 1,
                category: 1,
            }
        }
    ])
        .then((data) => {
            res.status(200).json({
                success: true,
                message:'abc',
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

