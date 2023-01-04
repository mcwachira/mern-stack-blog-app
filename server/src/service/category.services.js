const Category = require('../models/categoryModel')
// const Post = require('../models/postModel')

const createCategories = async (categoryObject) => {

    const { name } = categoryObject;


    //check for existing category or duplicates
    //.exec() enables use to get a promise back
    const duplicateCategory = await Category.findOne({ name }).lean().exec()
    if (duplicateCategory) {
        throw Error('category with that name already exist')

    }

    const categoryName = { name }

    try {
        const category = await Category.create(categoryName)

        return category
    }
    catch (error) {

        console.log(error)
    }

}

const getAllCategories = async () => {
    try {

        const categories = await Category.find()

        return categories
    } catch (error) {
        console.log(error)
    }

}

const getCategoryById = async (id) => {
    try {

        const category = await Category.findById(id)

        return category
    } catch (error) {
        console.log(error)
    }
}


const updateCategory = async (updateCategory) => {

    const { name, categoryId } = updateCategory
    console.log(categoryId)

    //check id the category exist
    const category = await Category.findById(categoryId).exec()

    if (!category) {
        throw Error('No category with that id exits')

    }

    //check if name is in use
    const duplicateCategory = await Category.findOne({ name }).lean().exec()
    if (duplicateCategory) {
        throw Error('category name already in use')
    }


    //update the category details
    const updatedCategoryDetails = {
        name: name
    }



    //will update the category and return  iut immediately via the new:true value
    const updatedCategory = Category.findByIdAndUpdate(categoryId, updatedCategoryDetails, { new: true })

    return updatedCategory;


}

const deleteCategory = async (categoryId) => {

    //check id the category exist
    const category = await Category.findById(categoryId).exec()

    if (!category) {
        throw Error('No category with that id exits')
    }
    // //delete all the post of the category before deleting the actual category
    // const deletedPost = await Post.deleteMany({ categoryId })
    const deletedCategory = await Category.findByIdAndDelete(categoryId)

    return deletedCategory
}

module.exports = {
    createCategories,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}