const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
        required: false

    },

    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false
    }
},
    {
        timestamps: true
    } //enable us to get time for post was created
)


module.exports = mongoose.model('Post', postSchema)
