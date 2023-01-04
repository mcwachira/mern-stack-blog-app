const express = require('express')

const router = express.Router()

const categoryValidation = require('../controllers/category/category.validator')
const categoryController = require('../controllers/category/category.controller')


router.post('/create', categoryValidation, categoryController.createCategories)
router.get('/categories', categoryController.getAllCategories)

router.get('/categories/:categoryId', categoryController.getCategoriesById)


router.put('/category/:categoryId', categoryController.updateCategory)

router.delete('/delete/category/:categoryId', categoryController.deleteCategory)






module.exports = router