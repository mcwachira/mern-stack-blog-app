

//this for getting a session and logiin out
const requireUser = (req, res) => {

    if (!req.user) {
        return res.status(403).send('Invalid session')
    }

    return next()
}