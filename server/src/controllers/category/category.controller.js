const AppError = require('../../utils/appError')
const categoryServices = require('../../service/category.services')



const createCategories = async (req, res, next) => {
    const { name } = req.body

    //first thing is to check the data

    if (!name) {
        return res.status(400).json({ message: 'all fields are required' })
    }




    const categoryObject = {
        "name": name

    }

    try {
        const category = await categoryServices.createCategories(categoryObject)
        res.status(200).json(category)
    } catch (error) {
        return next(new AppError(`error${error}`), 401)
    }



}





const getAllCategories = async (req, res, next) => {


    try {
        const allCategories = await categoryServices.getAllCategories()
        res.status(200).json(allCategories)
    } catch (error) {
        return next(new AppError('categories not found'), 404)
    }




}

const getCategoriesById = async (req, res, next) => {

    const categoryId = req.params.categoryId


    try {
        const category = await categoryServices.getCategoryById(categoryId)
        console.log(category)
        res.status(200).json(category)
    } catch (error) {
        return next(new AppError('category not found'), 404)
    }
}



const updateCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId


    const { name } = req.body
    // console.log(description)

    if (!name) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const updatedCategory = {
        categoryId,
        name

    }

    try {
        const updateCategory = await categoryServices.updateCategory(updatedCategory)
        res.status(200).json(updateCategory)
    } catch (error) {
        console.log('error:', error)
        return next(new AppError('category not found'), 404)
    }
}

const deleteCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId
    console.log(categoryId)
    try {
        const deletedCategory = await categoryServices.deleteCategory(categoryId)
        res.status(200).json({ message: 'category deleted successfully' })
    } catch (error) {
        return next(new AppError(`error${error}`), 401)
    }
}

module.exports = {
    createCategories,
    getAllCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory,
}