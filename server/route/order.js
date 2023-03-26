const express = require('express');

const router = express.Router()
const OrderModel = require('../model/Order');
const PaymentModel = require('../model/Payment');
const OrderDetailModel = require('../model/OrderDetail');
const { default: mongoose } = require('mongoose');

router.get('/', async (req, res) => {
    OrderModel.aggregate([
        {
            $lookup: {
                from: "payments",
                localField: "payment_id",
                foreignField: "_id",
                as: "payment"
            }
        },
        {
            $lookup: {
                from: "order_details",
                localField: "_id",
                foreignField: "order_id",
                as: "orders"
            }
        },
        {
            $project: {
                _id: 1,
                payment: 1,
                coin: 1,
                orders: 1
            }
        }
    ]).then((data) => {
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

router.get('/:user_id', async (req, res) => {
    try {
        const data = OrderModel.find({ user_id: mongoose.Types.ObjectId(req.params.user_id) })

        res.status(200).json({
            success: true,
            data: data,
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


router.post('/', async (req, res) => {
    try {
        const mount = req.body.orders.reduce((init, item) => init += item.total, 0)
        const paymentData = new PaymentModel({ mount, ...req.body })
        await paymentData.save()
        const orderData = new OrderModel({
            payment_id: paymentData._id,
            coin: req.body.coin
        })
        await orderData.save()
        req.body.orders.forEach((items) => {
            const orderDetailData = new OrderDetailModel({
                order_id: orderData._id,
                ...items
            })
            orderDetailData.save()
        })
        res.status(200).json({
            success: true,
            message: 'payment success',
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

module.exports = router;

