const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const { default: mongoose } = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const mongoClient = new MongoClient(process.env.DATABASE_URL)
const baseUrl = process.env.BASE_URL
const GridFSBucket = require('mongodb').GridFSBucket

router.post('/upload', async (req, res, next) => {
    try {
        await upload(req, res)
        // console.log(req.files);

        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: 'You must select at least 1 file.' })
        }

        // if (req.file == undefined) {
        //     return res.send({
        //         message: "You must select a file.",
        //     });
        // }

        return res.status(200).send({
            data: req.files
        })
    } catch (error) {
        console.log(error)

        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).send({
                message: 'Too many files to upload.'
            })
        }
        return res.status(500).send({
            message: `Error when trying upload many files: ${error}`
        })
    }
})

router.get('/all', async (req, res) => {
    try {
        const database = mongoClient.db('shopify')
        const images = database.collection('image' + '.files')

        const cursor = images.find({})

        if ((await cursor.count()) === 0) {
            return res.status(500).send({
                message: 'No files found!'
            })
        }

        let fileInfos = []
        await cursor.forEach(doc => {
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename
            })
        })

        return res.status(200).send(fileInfos)
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

router.get('/:file_id', async (req, res) => {
    try {
        await mongoClient.connect()
        const database = mongoClient.db('shopify')
        const bucket = new GridFSBucket(database, {
            bucketName: 'image'
        })

        // let downloadStream = bucket.openDownloadStreamByName(req.params.file_name)

        // downloadStream.on('data', function (data) {
        //     return res.status(200).send(data)
        // })

        // downloadStream.on('error', function (err) {
        //     return res.status(404).send({ message: 'Cannot download the Image!' })
        // })
        const file = bucket
            .find({ _id: mongoose.Types.ObjectId(req.params.file_id) })
            .toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(404).json({
                        err: 'no files exist'
                    })
                }
                bucket.openDownloadStreamByName(files[0].filename).pipe(res)
            })
        // downloadStream.on("end", () => {
        //     return res.end();
        // });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
})

module.exports = router
