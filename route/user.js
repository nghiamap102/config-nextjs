const express = require('express');

const router = express.Router()
const Model = require('../model/User');
//Post Method

router.post('/', async (req, res) => {
    const data = new Model(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.get('/', async (req, res) => {
    Model.find()
        .then((allCourse) => {
            return res.status(200).json({
                status: true,
                message: 'success',
                data: allCourse,
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

module.exports = router;

