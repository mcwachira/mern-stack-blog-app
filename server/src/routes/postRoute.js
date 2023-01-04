const express = require('express')

const router = express.Router()

const postValidation = require('../controllers/post/post.validator')
const postController = require('../controllers/post/post.controller')


router.post('/', postValidation, postController.createPost)
router.get('/posts', postController.getAllPosts)

router.get('/posts/:postId', postController.getPostById)


router.put('/update/:postId', postController.updatePost)

router.delete('/delete/:postId', postController.deletePost)






module.exports = router