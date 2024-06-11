const movieController = require('../controller/moviesController')
const authentication = require('../middleware/authentication')
const relatedUserOnly = require('../middleware/authorization')

const router = require('express').Router()

router.use(authentication)

router.get('/', movieController.getFavorite)
router.post('/add', movieController.addFavorite)
router.post('/update/:id', relatedUserOnly, movieController.updateFavorite)
router.delete('/delete/:id', relatedUserOnly, movieController.deleteFavorite)

module.exports = router