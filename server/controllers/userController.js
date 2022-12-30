const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');






const getUserById = asyncHandler(async (req, res) => {

    const id = req.params.id
    console.log(id)
    let user = await User.findById(id).select('-password').exec()
    if (!user) {
        return res.status(400).json({
            error: "User not found"
        })

    }

    res.status(200).json(user)


})



// @desc update a User
// @route PUT /users
//@access private 

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id


    const { username, password, email } = req.body
    //check the data 

    if (!username || !email) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    //check id the user exist
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: ' No user with that id exits' })
    }


    //check if username is already in use
    // const duplicateUser = await User.findOne({ username }).lean().exec()
    // if (duplicateUser && duplicateUser?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'username already in use' })
    // }


    //check if password is needed to change
    let updatedPassword

    if (password) {
        //hash the password
        updatedPassword = await bcrypt.hash(password, 10) //salt rounds
    }

    //update the user details
    const updatedUserDetails = {
        username: username,
        email: email,
        password: updatedPassword

    }

    const updatedUser = await User.findByIdAndUpdate(
        id, updatedUserDetails, {
        new: true
    })

    res.status(200).json(updatedUser)
})

//delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const deletedPost = await Post.deleteMany({ userId: id })
    const user = await User.findByIdAndDelete(id)
    // const user = req.profile
    // const deletedUser = await await user.remove()
    // const deletedUser = await User.findByIdAndDelete(id)

    // let user = req.profile
    // let deletedUser = await user.remove()
    // deletedUser.hashed_password = undefined
    // deletedUser.salt = undefined
    // res.json(deletedUser)

    if (!user) {
        res.status(400).json({ message: ' No user with that id exits' })
    }
    res.status(200).json({ message: 'user deleted successfully' })
})


module.exports = {
    updateUser,
    deleteUser,
    getUserById
}