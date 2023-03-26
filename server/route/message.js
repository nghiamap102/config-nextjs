const express = require('express');

const router = express.Router()
const messageModel = require('../model/Message');

router.post('/create', async (req, res) => {
    const data = new messageModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json({
            success: true,
            data: dataToSave
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


router.post('/create', async (req, res) => {
    const data = new messageModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json({
            success: true,
            data: dataToSave
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;

