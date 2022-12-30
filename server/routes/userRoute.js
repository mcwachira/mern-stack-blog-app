const express = require('express')
const { updateUser, deleteUser, getUserById } = require('../controllers/userController')
const router = express.Router()


router.get('/get/:id', getUserById)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)


module.exports = router