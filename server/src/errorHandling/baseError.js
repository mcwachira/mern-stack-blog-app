//Error node js object that gives you information about nodejs errors

// a base for our custom error object 
class BaseError extends Error {
    constructor(name, statusCode, isOperational, description) {
        // 'Error' breaks prototype chain here
        super(description)

        // Set the prototype explicitly.

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

module.exports = BaseError