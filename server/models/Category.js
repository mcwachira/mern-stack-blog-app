
const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

},
    {
        timestamps: true
    } //enable us to get time for category created or updated
)


module.exports = mongoose.model('Category', categorySchema)
