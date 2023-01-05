const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const Post = require('../models/postModel')

const getAllUsers = async () => {
    try {

        const users = await User.find()

        return users
    } catch (error) {
        console.log(error)
    }

}

const getUserById = async (id) => {
    try {

        const user = await User.findById(id).select('-password')

        return user
    } catch (error) {
        console.log(error)
    }
}


const updateUser = async (updateUser) => {

    const { userId, email, password, username } = updateUser
    //check id the user exist
    const user = await User.findById(userId).exec()

    if (!user) {
        throw Error('No user with that id exits')
    }

    //check if username is in use
    const duplicateUser = await User.findOne({ username }).lean().exec()
    if (duplicateUser) {
        throw Error('username already in use')
    }

    //check if the password is present and if so update it
    let updatedPassword;

    if (password) {
        updatedPassword = await bcrypt.hash(password, 10)
    }

    //update the user details
    const updatedUserDetails = {
        username: username,
        password: updatedPassword,
        email: email
    }



    //will update the user and return  iut immediately via the new:true value
    const updatedUser = User.findByIdAndUpdate(userId, updatedUserDetails, { new: true })

    return updatedUser;

}

const deleteUser = async (userId) => {

    //check id the user exist
    const user = await User.findById(userId).exec()

    if (!user) {
        throw Error('No user with that id exits')
    }
    //delete all the post of the user before deleting the actual user
    const deletedPost = await Post.deleteMany({ userId })
    const deletedUser = await User.findByIdAndDelete(userId)

    return deletedUser
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}