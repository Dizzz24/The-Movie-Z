const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw { name: "invalidToken" }

        const token = req.headers.authorization.split(' ')[1]

        const payload = verifyToken(token)

        const user = await User.findByPk(payload.id)
        if (!user) throw { name: "invalidToken" }

        req.user = { id: payload.id }

        console.log(user)

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication