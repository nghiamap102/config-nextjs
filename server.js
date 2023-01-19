require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3031
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL


mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express()
app.use(express.json())

const product = require('./route/product');
const productDetail = require('./route/productdetail');
const productType = require('./route/productType');
const checkout = require('./route/Checkout');
const cart = require('./route/cart');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/product', product)
app.use('/product/info', productDetail)
app.use('/product/type', productType)
app.use('/checkout', checkout)
app.use('/cart', cart)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

// socketIo.on("connection", (socket) => {
//     console.log("New client connected" + socket.id);

//     socket.on('SEND_MESSAGE', function (data) {
//         socketIo.emit('SEND_MESSAGE', { data });
//     })

//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//     });
// });