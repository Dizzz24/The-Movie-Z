const movieController = require('../controller/moviesController')
const authentication = require('../middleware/authentication')

const router = require('express').Router()

router.use(authentication)

router.get('/', movieController.getMovies)
router.get('/genres', movieController.getGenres)
router.get('/nowPlaying', movieController.nowPlaying)
router.get('/trailer/:id', movieController.trailer)

module.exports = router