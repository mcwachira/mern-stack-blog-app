const logger = require('../../loggers/logger')
const AppError = require('../../utils/appError')


const handleCastErrorDb = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value  ${err.value} please use another value`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDb = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProduction = (err, res) => {

    //Operational error send message to the client
    if (err.isOPerational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })

        //unknown error don't leak erro details
    } else {

        logger.error('Error', err)
        res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        })
    }

}



const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        //checking for  cast error nad handling it
        if (error.name === 'CastError') error = handleCastErrorDb(error)
        if (error.code === 11000) error = handleDuplicateFieldsDb(error)
        sendErrorProduction(error, res)
    }


}

module.exports = globalErrorHandler