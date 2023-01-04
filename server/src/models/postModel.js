const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: false

    },


    categories: {
        type: Array,
        required: false
    }

}, {
    timestamps: true
}
)

module.exports = mongoose.model('Post', postSchema)