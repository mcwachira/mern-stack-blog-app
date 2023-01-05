const { verifyJwt } = require("../utils/jwt.utils")


const deserializeUser = (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies

    if (!accessToken) {
        return next()
    }

    const { payload, expiresIn } = verifyJwt(accessToken)

    //valid access token
    if (payload) {
        req, user = payload
        return next()
    }



    //expires but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyJwt(refreshToken) : { payload: null }

    if (!refresh) {
        return next()
    }



    const session = getSession(refresh.sessionId)
    if (!session) {
        return next()
    }

    const newAccessToken = signJwt(session, '5s')
    res.cookie('accessToken', newAccessToken, {
        maxAge: 300000, //5min
        httpOnly: true,
    })


    req.user = verifyJwt(newAccessToken).payload
    return next()
}


export default deserializeUser


const logOut = (req, res) => {
    res.cookie('accessToken', "", {
        maxAge: 0,
        httpOnly: true
    })

    const newAccessToken = signJwt(session, '5s')
    res.cookie('accessToken', newAccessToken, {
        maxAge: 300000, //5min
        httpOnly: true,
    })


    res.send({ success: true })

}