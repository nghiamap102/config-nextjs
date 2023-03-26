const express = require('express');

const router = express.Router()
const AddressModel = require('../model/Address');


router.post('/', async (req, res) => {
    try {
        const address = new AddressModel(req.body)
        const data = await address.save()
        res.status(200).json({
            success: true,
            message: 'success',
            data: data,
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});

router.get('/:user_id', async (req, res) => {
    try {
        const data = await AddressModel.find({ user_id: req.params.user_id })
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});

router.patch('/:address_id', async (req, res) => {
    try {
        const data = await AddressModel.findByIdAndUpdate(req.params.address_id, req.body)
        res.status(200).json({
            success: true,
            message: 'success',
            data: data,
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});

router.patch('/default/:address_id', async (req, res) => {
    try {
        const data = await AddressModel.updateMany({}, { default: false })
        const data2 = await AddressModel.findByIdAndUpdate(req.params.address_id, req.body)
        res.status(200).json({
            success: true,
            message: 'success',
            data: data2
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});


module.exports = router;

