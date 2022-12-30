const User = require('../models/User')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');




const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        username,
        desc,
        photo,
        categories } = req.body

    //first thing is to check the data

    if (!title || !desc || !username) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    //check for existing posts or duplicates
    //.exec() enables use to get a promise back
    const duplicatePosts = await Post.findOne({ title }).lean().exec()
    if (duplicatePosts) {
        return res.status(409).json({ message: 'post with that title already exist' })
    }


    const postObject = {
        "title": title,
        ' desc': desc,
        'username': username,
        'photo': photo,
        "categories": categories

    }
    const post = await Post.create(postObject)

    if (post) {
        res.status(201).json({ message: ` New post created ${post}` })
    } else {

        res.status(400).json({ message: 'post not created . invalid post data' })
    }
})



const getAllPosts = asyncHandler(async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.category

    let posts;
    if (username) {
        posts = await Post.find({ username })
    } else if (categoryName) {
        posts = await Post.find({
            categories: {

                //check for the categoryName inside the Categories Array
                $in: [categoryName]
            }
        })
    } else {
        posts = await Post.find()
    }

    if (!posts) {
        return res.status(400).json({
            error: "Posts  not found"
        })

    }

    res.status(200).json(posts)


})

const getPostById = asyncHandler(async (req, res) => {

    const id = req.params.id
    console.log(id)
    let post = await Post.findById(id)
    if (!post) {
        return res.status(400).json({
            error: "Post with that id  not found"
        })

    }

    res.status(200).json(post)


})


// @desc update a User
// @route PUT /users
//@access private 

const updatePost = asyncHandler(async (req, res) => {
    const id = req.params.id

    const { username, title, desc } = req.body
    //check the data 

    if (!username || !desc || !title) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const post = await Post.findById(req.params.id)
    if (post.username === username) {

        const updatedPostDetails = {
            title: title,
            desc: desc,

        }
        const updatedPost = await Post.findByIdAndUpdate(
            id, updatedPostDetails, {
            new: true
        })

        res.status(200).json(updatedPost)

    } else {
        return res.status(401).json({ message: 'You can only update your post' })
    }


})

//delete post
const deletePost = asyncHandler(async (req, res) => {

    const id = req.params.id

    const { username } = req.body
    //check the data 

    if (!username) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    const post = await Post.findById(req.params.id)
    if (post.username === username) {

        await post.delete()

        res.status(200).json('post deleted successfully')

    } else {
        return res.status(401).json({ message: 'You can only delete your post' })
    }



})


module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    getAllPosts,
}