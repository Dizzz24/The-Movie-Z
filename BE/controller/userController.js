const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { GOOGLE_AUDIENCE } = process.env
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class userController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body

            let newUser = await User.create({ username, email, password })

            newUser = newUser.toJSON();
            delete newUser.password;

            res.status(201).json(newUser);
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { unameOrEmail, password } = req.body

            if (unameOrEmail == "" || password == "") {
                throw { name: "required" };
            }

            let user;

            if (typeof unameOrEmail === "string" && unameOrEmail.includes("@")) {
                user = await User.findOne({ where: { email: unameOrEmail } })
            } else if (typeof unameOrEmail === "string") {
                user = await User.findOne({ where: { username: unameOrEmail } })
            }

            if (!user) {
                throw { name: "invalidInput" }
            }

            const verifyPassword = bcrypt.compareSync(password, user.password)

            if (!verifyPassword) {
                throw { name: "invalidInput" }
            }

            const payload = { id: user.id }

            const access_token = createToken(payload)

            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.headers

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: GOOGLE_AUDIENCE
            });

            const googlePayload = ticket.getPayload()

            console.log(ticket, "tiket nih")
            const [user, created] = await User.findOrCreate({
                where: { email: googlePayload.email },
                defaults: {
                    username: googlePayload.name,
                    email: googlePayload.email,
                    password: String(Math.random() * 1000)
                }
            })

            const payload = { id: user.id }

            const access_token = createToken(payload)

            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController