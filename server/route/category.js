const express = require('express');

const router = express.Router()
const CategoryModel = require('../model/Category');
const { default: mongoose } = require('mongoose');
const { verifyToken } = require('../middleware/auth');


router.get('/', async (req, res) => {
    CategoryModel.find()
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


router.get('/:parent_id', async (req, res) => {
    try {
        const category = await CategoryModel.aggregate([
            { $match: { parent_id: mongoose.Types.ObjectId(req.params.parent_id) } }
        ])
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        res.status(500).json({ message: 'An error occured!' })
    }

})


router.post('/', async (req, res) => {
    const data = new CategoryModel(req.body)
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
    CategoryModel.update({ _id: req.body._id }, { $set: data })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'category is updated',
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

router.patch('/all', async (req, res) => {
    try {
        const data = await CategoryModel.updateMany({}, { image: 'https://res.cloudinary.com/bededuxe/image/upload/v1676811419/281146625_3108702309379467_7463968762089676304_n-removebg-preview_gqb521.png' })
        res.status(200).json({
            success: true,
            message: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
})

router.delete('/:item_id', async (req, res) => {
    const id = req.params.item_id;
    const cart = await CategoryModel.findById(id)
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
            message: 'item is not exist',
        });
    }
})


router.post('/delete_ids', async (req, res) => {
    CategoryModel.deleteMany({ _id: { $in: req.body } })
        .then((singleCourse) => {
            res.status(200).json({
                success: true,
                message: 'item is deleted',
            });
        }).catch(() => {
            res.status(500).json({
                success: false,
                message: 'item is not exist',
            });
        })
})


module.exports = router;

