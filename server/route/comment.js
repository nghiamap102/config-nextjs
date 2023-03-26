const express = require('express');

const router = express.Router()
const CommentModel = require('../model/Comment');
const { default: mongoose } = require('mongoose');
const PER_PAGE = 5; // số lượng sản phẩm xuất hiện trên 1 page
const PAGE = 1;

router.post('/', async (req, res) => {
    try {
        const comment = new CommentModel(req.body)
        console.log(comment)
        const data = await comment.save()
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});

router.get('/:product_id', async (req, res) => {
    try {
        const product_id = mongoose.Types.ObjectId(req.params.product_id)
        const star_avg = await CommentModel.aggregate(
            [
                { $match: { product_id: product_id } },
                { $group: { _id: "$product_id", value: { $avg: "$star" } } }
            ]
        )
        const data = (await CommentModel.find({ product_id: product_id })).length
        const data1 = (await CommentModel.find({ product_id: product_id, star: 1 })).length
        const data2 = (await CommentModel.find({ product_id: product_id, star: 2 })).length
        const data3 = (await CommentModel.find({ product_id: product_id, star: 3 })).length
        const data4 = (await CommentModel.find({ product_id: product_id, star: 4 })).length
        const data5 = (await CommentModel.find({ product_id: product_id, star: 5 })).length
        const dataVideo = (await CommentModel.find({ product_id: product_id, video: { "$ne": "" } })).length
        const datacomment = (await CommentModel.find({ product_id: product_id, image: { "$ne": [] } })).length
        res.status(200).json({
            success: true,
            data: {
                star_avg: star_avg[0],
                filter: {
                    all: data,
                    star_1: data1,
                    star_2: data2,
                    star_3: data3,
                    star_4: data4,
                    star_5: data5,
                    with_video: dataVideo,
                    with_comment: datacomment,
                }
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
});

router.post('/page', async (req, res) => {
    try {
        const page = req.body.page || PAGE
        const type = req.body.type
        const typeConds = req.body.type === 'all' ? { $lte: 5 } : { $eq: parseInt(type.slice(type.search(/\d/))) }

        const product_id = mongoose.Types.ObjectId(req.body.product_id)
        const comment = await CommentModel.aggregate([
            { $match: { product_id: product_id, star: typeConds } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                    pipeline: [{ $project: { avatar: 1, name: 1 } }]
                }
            },
            { $unwind: '$user' },
            {
                $set: {
                    category: {
                        $map: {
                            input: "$category",
                            as: "item",
                            in: { $toObjectId: "$$item" }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'product_types',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                    pipeline: [{ $project: { _id: 0, product_id: 0, cat_group: 0, __v: 0 } }]
                }
            },
            {
                $project: {
                    user_id: 0,
                    __v: 0
                }
            }
        ])
            .skip((page * PER_PAGE) - PER_PAGE) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(PER_PAGE)

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        res.status(500).send({ message: 'There is an error' });
    }
})

// filter
// router.get('/:page', async (req, res) => {
//     try {
//         const page = PAGE || req.params.page

//         // const comment = await CommentModel.find({}).limit(5).sort('-createdAt')
//         const comment = await CommentModel.find() // find tất cả các data
//             .skip((PER_PAGE * page) - PER_PAGE) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
//             .limit(PER_PAGE)

//         res.status(200).json({
//             success: true,
//             data: comment
//         });
//     } catch (error) {
//         res.status(500).send({ message: 'There is an error' });
//     }
// })


module.exports = router;

