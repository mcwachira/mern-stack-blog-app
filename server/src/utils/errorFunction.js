const errorFunction = (errorBit, msg, data) => {
    if (errorBit) return { is_error: errorBit, message: msg }
    else return { is_error: errorBit, message: msg, data }
}


//1. errorBit – for checking if the error has occurred or not,
// 2. msg – for displaying appropriate messages for which action is performed,
// 3. data– sent to the user.
module.exports = errorFunction