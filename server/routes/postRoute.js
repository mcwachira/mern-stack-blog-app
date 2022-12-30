const express = require('express')
const { createPost, updatePost, deletePost, getPostById, getAllPosts } = require('../controllers/postsController')
const router = express.Router()

router.post('/post/create', createPost)
router.get('/post/:id', getPostById)
router.get('/post/', getAllPosts)
router.post('/post/create', createPost)
router.put('/post/update/:id', updatePost)
router.delete('/post/delete/:id', deletePost)
// router.get('/login', loginUser)

module.exports = router