const express = require('express')

const router = express.Router()

const handleRefreshToken = require('../controllers/auth/refresh.controller')




router.get('/refresh', handleRefreshToken)








module.exports = router