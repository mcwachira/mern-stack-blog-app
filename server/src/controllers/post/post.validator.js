const Joi = require('joi');
const errorFunction = require('../../utils/errorFunction')
const { logError } = require('../../errorHandling/errorHandler')
const AppError = require('../../utils/appError')

const validation = Joi.object({
    userId: Joi.string().hex().length(24),
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().required(),
    photo: Joi.string(),
    categories: Joi.array().items(Joi.string())
})

const postValidation = async (req, res, next) => {
    const payload = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
        categories: req.body.categories
    }

    const { error } = validation.validate(payload)

    if (error) {

        next(new AppError(`Error in Post Data : ${error.message}`, 406))


    } else {
        next()
    }
}

module.exports = postValidation