const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const connectDb = require('./config/db')
const multer = require('multer')
require('dotenv').config()




//initialize express app
const app = express()

//create our port 
const PORT = process.env.PORT || 8001

//connect our database
connectDb()

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }))


//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '/public')))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')//destination folder
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})


const upload = multer({ storage: storage })
app.post("/api/upload", upload.single('file'), (req, res) => {
    res.status(200).json('file has been uploaded')
})

//get my routes

const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const postRouter = require('./routes/postRoute')
const categoryRouter = require('./routes/categoryRoute')
// const cartRouter = require('./routes/cartRoute')
// const checkoutRouter = require('./routes/stripeRoute')

app.use('/api/v1', userRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', postRouter)
app.use('/api/v1', categoryRouter)
// app.use('/api/v1', cartRouter)
// app.use('/api/v1', checkoutRouter)
// app.use('/', authRouter)



app.listen(PORT, (req, res) => {
    console.log(`app running on port ${PORT}`)
})
