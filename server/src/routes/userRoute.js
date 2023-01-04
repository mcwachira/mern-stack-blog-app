const express = require('express')

const router = express.Router()

const userController = require('../controllers/user/user.controller')

router.get('/', userController.getAllUsers)

router.get('/:userId', userController.getUserById)


router.put('/:userId', userController.updateUser)

router.delete('/:userId', userController.deleteUser)






module.exports = router