
const postServices = require('../../service/post.service')

const AppError = require('../../utils/appError')



const createPost = async (req, res, next) => {
    const {
        title,
        userId,
        description,
        photo,
        categories } = req.body

    //first thing is to check the data

    if (!title || !description || !userId) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const postData = {
        title,
        userId,
        description,
        photo,
        categories

    }

    try {
        const post = await postServices.createPost(postData)
        console.log(post)
        res.status(200).json(post)
    } catch (error) {
        return next(new AppError(`error${error}`), 401)
    }


}


const getAllPosts = async (req, res, next) => {


    try {
        const allPosts = await postServices.getAllPosts()
        res.status(200).json(allPosts)
    } catch (error) {
        return next(new AppError('posts not found'), 404)
    }




}

const getPostById = async (req, res, next) => {

    const postId = req.params.postId


    try {
        const post = await postServices.getPostById(postId)
        console.log(post)
        res.status(200).json(post)
    } catch (error) {
        return next(new AppError('posts not found'), 404)
    }
}



const updatePost = async (req, res, next) => {
    const postId = req.params.postId


    const { title, description, categories } = req.body
    // console.log(description)

    // if (!title || !description || !Array.isArray(categories) || !categories.length) {
    //     return res.status(400).json({ message: 'all fields are required' })
    // }

    const updatedPost = {
        postId,
        title,
        description,
        categories

    }

    try {
        const updatePost = await postServices.updatePost(updatedPost)
        res.status(200).json(updatePost)
    } catch (error) {
        console.log('error:', error)
        return next(new AppError('posts not found'), 404)
    }
}

const deletePost = async (req, res, next) => {
    const postId = req.params.postId
    console.log(postId)
    try {
        const deletedPost = await postServices.deletePost(postId)
        res.status(200).json({ message: 'post deleted successfully' })
    } catch (error) {
        return next(new AppError(`error${error}`), 401)
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}