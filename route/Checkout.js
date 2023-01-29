const express = require('express');

const router = express.Router()
const CheckoutModel = require('../model/Checkout');

router.get('/', async (req, res) => {
    CheckoutModel.aggregate([
        {
            $set: {
                product_ids: {
                    $map: {
                        input: "$cart_ids",
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
                from: "carts",
                localField: "cart_ids",
                foreignField: "_id",
                as: "carts"
            }
        },
        {
            $unwind: '$carts'
        },
        {
            $lookup: {
                from: "product_samples",
                localField: "carts.sample_id",
                foreignField: "_id",
                as: "product_sample"
            }
        }
    ]).then((data) => {
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
    if (req.body.length === 0) {
        res.status(500).json({ message: 'An error occured!' })
    }
    else {
        const newArr = []
        req.body.forEach(items => newArr.push({ _id: items }))
        const data = new CheckoutModel({
            "cart_ids": newArr
        })
        try {
            const dataToSave = await data.save();
            console.log(dataToSave)
            res.status(200).json({
                success: true,
                message: 'success',
                data: dataToSave
            })
        }
        catch (error) {
            res.status(500).json({ message: 'An error occured!' })
        }
    }
})


module.exports = router;

