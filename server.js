require('dotenv').config();
const process = require('process');
const express = require('express')
const PORT = process.env.PORT || 3031
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
const app = express()
const cors = require('cors');
mongoose.connect(mongoString);

// emit event
// const EventEmitter = require("events");
// class TicketManager extends EventEmitter {
//     constructor(supply) {
//         super();
//         this.supply = supply;
//     }

//     buy(email, price) {
//         this.supply--;
//         this.emit("buy", email, price, Date.now());
//     }
// }
// const ticketManager = new TicketManager(10);
// ticketManager.on("buy", () => {
//     console.log("Someone bought a ticket!");
// });
// ticketManager.buy("test@email.com", 20);
// ROUTE


const product = require('./route/product');
const productType = require('./route/productType');
const productSample = require('./route/productSample');
const checkout = require('./route/checkout');
const order = require('./route/order');
const cart = require('./route/cart');
const userRoute = require('./route/user');
const roleRoute = require('./route/role');
const chatRoute = require('./route/chat');
const messageRoute = require('./route/message');
const addressRoute = require('./route/address');
const categoryRoute = require('./route/category');
const imageRoute = require('./route/image');
const commentRoute = require('./route/comment');
const http = require('http').Server(app);

// SOCKET
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3030"
    }
});

app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
    // console.log(`⚡: ${socket.id} user just connected!`)
    socket.on("send_message", data => {
        socketIO.emit("message_response", data)
    })

    socket.on("fetch_chat", async (data) => {
        // const chat = await chatModel.find({
        //     members: data    
        // })
        // console.log(chat)
        socketIO.emit("chat_list")
    })

    socket.on("create_chat", data => {
        socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
        socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
        socketIO.emit("newUserResponse", users)
    })

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        socketIO.emit("newUserResponse", users)
        socket.disconnect()
    });
});

// app.use(function (req, res, next) {

// Website you wish to allow to connect
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');

// Request methods you wish to allow
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST,OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
// res.setHeader('Access-Control-Allow-Credentials', true);
// Pass to next layer of middleware
//     next();
// });


// USE ROUTE
app.use(express.json())

app.use('/product', product)
// app.use('/product/info', productDetail)
app.use('/product/type', productType)
app.use('/product/sample', productSample)
app.use('/checkout', checkout)
app.use('/order', order)
app.use('/cart', cart)
app.use('/chat', chatRoute)
app.use('/message', messageRoute)
app.use('/address', addressRoute)
app.use('/category', categoryRoute)
app.use('/file', imageRoute)
app.use('/comment', commentRoute)
app.use(roleRoute)
app.use(userRoute)

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});