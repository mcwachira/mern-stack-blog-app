const Category = require('../models/Category')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
    const {
        name } = req.body

    //first thing is to check the data

    if (!name) {
        return res.status(400).json({ message: 'all fields are required' })
    }




    const categoryObject = {
        "name": name

    }
    const category = await Category.create(categoryObject)

    if (category) {
        res.status(201).json({ message: ` New category created ${category}` })
    } else {

        res.status(400).json({ message: 'category not created . invalid category data' })
    }
})



const getAllCategory = asyncHandler(async (req, res) => {

    const categories = Category.find()


    if (!categories) {
        return res.status(400).json({
            error: "Categories  not found"
        })

    }

    res.status(200).json(categories)


})



module.exports = {
    createCategory,
    getAllCategory
}