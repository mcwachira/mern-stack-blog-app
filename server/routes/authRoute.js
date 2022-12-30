const express = require('express')
const { registerUser,
    loginUser } = require('../controllers/authController')
const router = express.Router()

router.post('/create', registerUser)
router.get('/login', loginUser)

module.exports = router