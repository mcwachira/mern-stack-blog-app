const mongoose = require('mongoose')
const colors = require('colors');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            name: 'MernEcomm',
        })

        console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`error :${error.messages}`.red.underline.bold)
        process.exit(1)
    }


}



// process.on('unhnadled promise rejection', err => {
//     console.log(err.name, err.message);
//     console.log('Unhandled  promise rejection *** shitting down **')
//     server.close(() => {
//         process.exit(1)
//     })
// })

//mover to the top
// process.on('uncaught exception rejection', err => {
//     console.log('Uncaught exceptions *** shutting down **')
//     console.log(err.name, err.message);


//         process.exit(1)

// })

module.exports = connectDb;
