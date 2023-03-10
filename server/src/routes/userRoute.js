const express = require('express')
const verifyJwt = require('../middleware/verifyJwt')

const router = express.Router()

const userController = require('../controllers/user/user.controller')

router.get('/', verifyJwt, userController.getAllUsers)

router.get('/:userId', userController.getUserById)


router.put('/:userId', userController.updateUser)

router.delete('/:userId', userController.deleteUser)






module.exports = router