const bcrypt = require('bcrypt');
const Post = require('../models/postModel')
const User = require('../models/userModel')







const createPost = async (postData) => {

    const { title,
        userId,
        description,
        photo,
        categories
    } = postData

    console.log(userId)
    //check if user creating the post exist


    const user = await User.findById(userId).exec()
    console.log(user)
    if (!user) {
        throw Error('user not found')
        // return
    }



    //check for existing posts or duplicates
    //.exec() enables use to get a promise back
    const duplicatePosts = await Post.findOne({ title }).lean().exec()
    if (duplicatePosts) {
        throw Error('post with that title already exist')

    }


    const postObject = {
        "title": title,
        'description': description,
        'userId': userId,
        'photo': photo,
        "categories": categories

    }

    try {
        const post = await Post.create(postObject)

        return post

    } catch (error) {

        console.log(error)
    }



}



const getAllPosts = async () => {

    try {


        const posts = await Post.find()
        console.log(posts)


        if (!posts?.length) {
            return res.status(400).json({ message: 'Posts do not exist' })
        }

        // Add username to each post before sending the response 
        // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
        // You could also do this with a for...of loop
        const postsWithUser = await Promise.all(posts.map(async (post) => {
            const user = await User.findById(post.userId).lean().exec()
            return { ...post, username: user.username }
        }))




        return postsWithUser
    } catch (error) {
        throw Error(error)
    }

}

const getPostById = async (postId) => {

    console.log(postId)
    try {

        const post = await Post.findById(postId)


        return post
    } catch (error) {
        throw Error(error)
    }
}


const updatePost = async (updatePost) => {

    const { title, description, categories, postId } = updatePost
    //check id the post exist
    const post = await Post.findById(postId).exec()

    if (!post) {
        throw Error('No post with that id exits')

    }

    //check for duplicate
    const duplicatePost = await Post.findOne({ title }).lean().exec()
    if (duplicatePost) {
        throw Error('post with that title already exist')
    }


    //update the post details
    //update the post details
    const updatedPostDetails = {
        title: title,
        description: description,
        categories: categories
    }



    //will update the post and return  iut immediately via the new:true value
    const updatedPost = Post.findByIdAndUpdate(postId, updatedPostDetails, { new: true })

    return updatedPost;

}

const deletePost = async (postId) => {
    //check id the post exist
    const post = await Post.findById(postId).exec()

    if (!post) {
        throw Error('No post with that id exits')

    }
    const deletedPost = await Post.findByIdAndDelete(postId)

    return deletedPost
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}