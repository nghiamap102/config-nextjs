const express = require('express');

const router = express.Router()
const CheckoutModel = require('../model/Checkout');
const { default: mongoose } = require('mongoose');

router.get('/:_id', async (req, res) => {
    CheckoutModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params._id), } },
        { $lookup: { from: "product_samples", localField: "items.sample_id", foreignField: "_id", as: "product_sample" } },
        { $lookup: { from: "products", localField: "items.product_id", foreignField: "_id", as: "product" } },
        { $lookup: { from: "product_types", localField: "product_sample.product_type_id", foreignField: "_id", as: "product_type" } },
        {
            $addFields: {
                items: {
                    $map: {
                        input: "$items",
                        as: "item",
                        in: {
                            product_sample: {
                                $let: {
                                    vars: {
                                        product_sample: {
                                            $arrayElemAt: [{
                                                $filter: {
                                                    input: '$product_sample',
                                                    as: 'product_sample',
                                                    cond: { $eq: ['$$product_sample._id', '$$item.sample_id'] },
                                                }
                                            }, 0],
                                        },
                                    },
                                    in: {
                                        _id: '$$product_sample._id',
                                        image: '$$product_sample.image',
                                        unit_price: '$$product_sample.unit_price',
                                        count_in_stock: '$$product_sample.count_in_stock',
                                        product_type: {
                                            $map: {
                                                input: "$$product_sample.product_type_id",
                                                as: "type",
                                                in: {
                                                    $arrayElemAt: [{
                                                        $filter: {
                                                            input: '$product_type',
                                                            as: 'types',
                                                            cond: { $eq: ['$$types._id', '$$type'] },
                                                        }
                                                    }, 0],
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            product: {
                                $let: {
                                    vars: {
                                        product_sample: {
                                            $arrayElemAt: [{
                                                $filter: {
                                                    input: '$product',
                                                    as: 'product_sample',
                                                    cond: { $eq: ['$$product_sample._id', '$$item.product_id'] },
                                                }
                                            }, 0]
                                        }
                                    },
                                    in: '$$product_sample'
                                }
                            },
                            quantity: '$$item.quantity'
                        }
                    }
                }
            },
        },
        {
            $project: {
                items: 1,
                _id: 1,
                createdAt: 1
            }
        }
    ]).then((data) => {
        res.status(200).json({
            success: true,
            data: data
        })
    })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: 'An error occured!',
            })
        })
})

router.post('/', async (req, res) => {
    if (req.body.length === 0) {
        res.status(500).json({ message: 'An error occured!' })
    }
    else {
        const newArr = req.body.reduce((initArray, item) => [...initArray, item], [])
        const data = new CheckoutModel({
            "items": newArr
        })
        try {
            const dataToSave = await data.save();
            res.status(200).json({
                success: true,
                data: dataToSave._id
            })
        }
        catch (error) {
            res.status(500).json({ message: 'An error occured!' })
        }
    }
})


module.exports = router;

