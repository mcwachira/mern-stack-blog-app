const Joi = require('joi');
const errorFunction = require('../../utils/errorFunction')
const { logError } = require('../../errorHandling/errorHandler')
const AppError = require('../../utils/appError')

const validation = Joi.object({
    name: Joi.string(),
})

const categoryValidation = async (req, res, next) => {
    const payload = {

        name: req.body.name
    }

    const { error } = validation.validate(payload)

    if (error) {

        next(new AppError(`Error in category Data : ${error.message}`, 406))


    } else {
        next()
    }
}

module.exports = categoryValidation