const router = require('express').Router()
const movieRouter = require('./movieRouter')
const favoriteMovieRouter = require('./favoriteMovieRoute')
const userController = require('../controller/userController')
const axios = require('axios')

router.get('/', (req, res) => {
    res.send("Runnn Bro")
})

router.get('/randomQuote', async (req, res) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: 'https://type.fit/api/quotes'
        })

        res.status(200).json(data)
    } catch (error) {
        res.status(200).json({ message: "something went wrong" })
    }
})


router.use('/movies', movieRouter)
router.use('/favorites', favoriteMovieRouter)

router.post('/login', userController.login)
router.post('/loginGoogle', userController.googleLogin)
router.post('/register', userController.register)

module.exports = router