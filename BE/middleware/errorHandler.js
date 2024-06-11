async function errorHandler(error, req, res, next) {
    console.log(error, "error ==================================")
    let statusCode = 500
    let message = error.response?.data.status_message || "Internal server error"

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = error.errors.map(el => el.message)
            console.log(message)
            break;
        case "required":
            statusCode = 400
            message = `Username, email or password can't be empty`
            break
        case "invalidInput":
            statusCode = 401
            message = "Invalid Username, email or password"
            break

        case "invalidToken":
        case "JsonWebTokenError":
            statusCode = 401
            message = "Invalid Token"
            break;
        case "unauthorized":
            statusCode = 403
            message = "You don't have access"
            break;
        case "A/N":
            statusCode = 404
            message = "Movie not found"
            break;
    }

    res.status(statusCode).json({ message })
}

module.exports = errorHandler