const jwt = require('jsonwebtoken')
const fs = require('fs')

// const PrivateKey = fs.readFileSync('../certs/private.pem')
// const publicKey = fs.readFileSync('../certs/public.pem')

// console.log(PrivateKey)
//signing jwt
const signJwt = (payload, expiresIn) => {

    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn })
}


//verify jwt

const verifyJwt = (token) => {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN)
        return {
            payload: decoded, expired: false
        }
    } catch (error) {

        return {
            payload: null,
            expired: error.message.includes('jwt expired')
        }
    }
}


module.exports = {
    signJwt,
    verifyJwt
}