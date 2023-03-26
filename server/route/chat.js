const express = require('express');

const router = express.Router()
const chatModel = require('../model/Chat');
const messageModel = require('../model/Message');
const { default: mongoose } = require('mongoose');
const { PER_PAGE_MESSAGE } = require('../constant');

router.get('/all_chat/:user_id', async (req, res) => {
    const user_id = req.params.user_id
    chatModel.aggregate([
        {
            $set: {
                members: {
                    $map: {
                        input: "$members",
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
                from: "users",
                localField: "members",
                foreignField: "_id",
                as: "members",
                pipeline: [
                    {
                        $project: { __v: 0, password: 0, role: 0, createdAt: 0, updatedAt: 0 },
                    },
                ]
            }
        },
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "chat_id",
                as: "messages",
                pipeline: [
                    {
                        $project: { __v: 0, _id: 0, chat_id: 0, updatedAt: 0 },
                    },
                ]
            }
        },
        {
            $project: {
                _id: 1,
                creator_id: 1,
                partner: {
                    $arrayElemAt: [{
                        $filter: {
                            input: '$members',
                            as: 's',
                            cond: { $eq: [{ $toObjectId: user_id }, '$$s._id'] },
                        }
                    }, 0]
                },
                last_message: { $arrayElemAt: [{ $slice: ["$messages", -1] }, 0] },
                createdAt: 1
            }
        }
    ])
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data
            })
        })
        .catch(error => {
            res.json({ message: 'An error occured!' })
        })
})

router.post('/create', async (req, res) => {
    const data = new chatModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json({
            success: true,
            message: 'success',
            data: dataToSave
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/:chat_id', async (req, res) => {
    const chat_id = req.params.chat_id
    const page = req.query.page || 1
    try {

        const chatData = await chatModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(chat_id) }
            },
            {
                $project: {
                    _id: 1,
                    creator_id: 1,
                }
            },
        ])
        const messages = await messageModel.find({ chat_id: chatData[0]._id }).sort('-createdAt').skip((page * PER_PAGE_MESSAGE) - PER_PAGE_MESSAGE).limit(PER_PAGE_MESSAGE)
        res.status(200).json({
            success: true,
            data: { ...chatData[0], messages }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
})



module.exports = router;

