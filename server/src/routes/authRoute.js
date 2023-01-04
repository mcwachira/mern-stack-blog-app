const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth/auth.controller')
const authValidation = require('../controllers/auth/auth.validator')



router.post('/register', authValidation, authController.registerUser)
router.post('/login', authController.logInUser)








module.exports = router