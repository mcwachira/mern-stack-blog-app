const express = require('express')
const { getAllCategory, createCategory } = require('../controllers/categoryController')
const router = express.Router()


router.post('/category/create/', createCategory)

router.get('/category/get/', getAllCategory)



module.exports = router