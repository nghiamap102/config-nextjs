const express = require('express');

const router = express.Router()
const productModel = require('../model/Product');
const { default: mongoose } = require('mongoose');
const SORTTYPE = {
    POP: 'pop',
    SALE: 'sale',
    TIME: 'time',
}
const PER_PAGE = 50
// router.get('/', async (req, res) => {
//     productModel.aggregate([
//         { $lookup: { from: "product_samples", localField: "_id", foreignField: "product_id", as: "product_sample" } },
//         { $lookup: { from: "product_types", localField: "_id", foreignField: "product_id", as: "product_type" } },
//         {
//             $addFields: {
//                 product_sample: {
//                     $map: {
//                         input: "$product_sample",
//                         as: "item",
//                         in: {
//                             _id: '$$item._id',
//                             product_type_id: '$$item.product_type_id',
//                             image: '$$item.image',
//                             unit_price: '$$item.unit_price',
//                             count_in_stock: '$$item.count_in_stock',
//                         },
//                     }
//                 }
//             }
//         },
//         {
//             $addFields: {
//                 product_type: {
//                     $map: {
//                         input: "$product_type",
//                         as: "item",
//                         in: {
//                             _id: '$$item._id',
//                             title: '$$item.title',
//                             cat_content: '$$item.cat_content',
//                             cat_group: '$$item.cat_group',
//                         },
//                     }
//                 }
//             }
//         },
//     ])
//         .then((data) => {
//             res.status(200).json({
//                 success: true,
//                 data: data
//             })
//         })
//         .catch(error => {
//             res.json({ message: 'An error occured!' })
//         })
// })


router.get('/', async (req, res) => {
    productModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.query.product_id) } },
        { $lookup: { from: "product_samples", localField: "_id", foreignField: "product_id", as: "product_sample" } },
        { $lookup: { from: "product_types", localField: "_id", foreignField: "product_id", as: "product_type" } },
        {
            $addFields: {
                product_sample: {
                    $map: {
                        input: "$product_sample",
                        as: "item",
                        in: {
                            _id: '$$item._id',
                            product_type_id: '$$item.product_type_id',
                            image: '$$item.image',
                            unit_price: '$$item.unit_price',
                            count_in_stock: '$$item.count_in_stock',
                        },
                    }
                }
            }
        },
        {
            $addFields: {
                product_type: {
                    $map: {
                        input: "$product_type",
                        as: "item",
                        in: {
                            _id: '$$item._id',
                            title: '$$item.title',
                            cat_content: '$$item.cat_content',
                            cat_group: '$$item.cat_group',
                        },
                    }
                }
            }
        },
    ])
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data[0]
            })
        })
        .catch(error => {
            res.json({ message: 'An error occured!' })
        })
})


router.get('/category', async (req, res) => {
    try {
        const query = req.query
        const page = query.page || 1

        const sortType = () => {
            // if (req.query.sort_type === SORTTYPE.POP) return ''
            if (req.query.sort_type === SORTTYPE.SALE) return '-sold'
            if (req.query.sort_type === SORTTYPE.TIME) return '-createdAt'
            return '-sold'
        }
        const length = (await productModel.find({ category: { $in: query.cat_id } })).length
        // {  category: { $in: query.cat_id } }
        const data = await productModel.aggregate([
            { $match: { category: { $in: [query.cat_id] } } },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'comment'
                }
            },
            {
                $addFields: {
                    rating: {
                        average: {
                            $avg: "$comment.star",
                        },
                        count: {
                            $size: "$comment",
                        }
                    },
                }
            },
        ]).sort(sortType()).skip((page * PER_PAGE) - PER_PAGE).limit(PER_PAGE)

        res.status(200).json({
            success: true,
            data,
            length
        })

    } catch (error) {
        res.status(500).json({ message: 'An error occured!' })
    }
})

router.get('/facet', async (req, res) => {
    try {
        const query = req.query
        const data = await productModel.aggregate([
            { $match: { category: { $in: [query.cat_id] } } },
            { $unwind: "$category" },
            { $set: { category_lookup: { $toObjectId: "$category" } } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_lookup',
                    foreignField: "_id",
                    pipeline: [{ $project: { __v: 0, parent_id: 0, image: 0 } }],
                    as: 'facet'
                }
            },
            { $unwind: '$facet' },
            {
                $group: {
                    _id: '$category',
                    detail: { $first: '$facet' },
                    count: { $sum: 1 }
                }
            },
        ])

        res.status(200).json({
            success: true,
            data,
        })
    } catch (error) {
        res.status(500).json({ message: 'An error occured!' })
    }
})
router.get('/new', async (req, res) => {
    try {
        const query = req.query
        const data = await productModel.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'comment'
                }
            },
            {
                $addFields: {
                    rating: {
                        average: {
                            $avg: "$comment.star",
                        },
                        count: {
                            $size: "$comment",
                        }
                    },
                }
            },
        ]).sort('-createdAt').limit(50)

        res.status(200).json({
            success: true,
            data,
        })
    } catch (error) {
        res.status(500).json({ message: 'An error occured!' })
    }
})


router.post('/', async (req, res) => {
    const data = new productModel(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})




module.exports = router;

