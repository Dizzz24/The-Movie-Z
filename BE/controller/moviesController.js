const axios = require("axios")
const { IMDB_TOKEN } = process.env
const { FavoriteMovie } = require("../models")

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${IMDB_TOKEN}`
}

class movieController {
    // request API
    static async getMovies(req, res, next) {
        try {
            console.log(req.query, "ini pakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
            let { search = "", page, year, rating, genreId } = req.query

            page = page || 1
            genreId = genreId || ""
            let ratingQuery = ""

            if (rating) {
                let q = rating.includes("-") ? `vote_average.lte=` : `vote_average.gte=`
                ratingQuery = q + rating.replace(/-/g, '')
            }

            const url = search ? `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}&year=${year}` : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}${ratingQuery && `&${ratingQuery}`}&with_genres=${genreId}&sort_by=popularity.desc`

            const { data } = await axios({
                method: 'get',
                url,
                headers
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error, "error ngab")
            console.log(error.response?.data, "error ngab")
        }
    }

    static async getGenres(req, res, next) {
        try {
            const { data } = await axios({
                method: 'get',
                url: `https://api.themoviedb.org/3/genre/movie/list?language=en`,
                headers
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error, "error ngab")
            console.log(error.response?.data, "error ngab")
        }
    }

    static async nowPlaying(req, res, next) {
        try {
            let { page } = req.query

            page = page || 1

            const { data } = await axios({
                method: 'get',
                url: `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
                headers
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error, "error ngab")
            console.log(error.response?.data, "error ngab")
        }
    }

    static async trailer(req, res, next) {
        try {
            const { id } = req.params

            const { data } = await axios({
                method: 'get',
                url: `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                headers
            })

            if (!data.results.length) {
                res.status(404).json({ message: "Movie trailer not found" })
            }

            const linkVideo = data.results.map(el => `https://www.youtube.com/embed/${el.key}`)

            res.status(200).json(linkVideo)
        } catch (error) {
            console.log(error, "error ngab")
            next(error)
            console.log(error.response?.data, "error ngab")
        }
    }

    // =========== End ============== //

    // =========== CRUD ============== //
    static async addFavorite(req, res, next) {
        try {
            let { title, overview, poster_path, backdrop_path, release_date, vote_average } = req.body

            const [newData, created] = await FavoriteMovie.findOrCreate({
                where: { title, userId: req.user.id },
                defaults: {
                    title, overview, poster_path, backdrop_path, release_date, vote_average, userId: req.user.id
                }
            })

            let message = created ? "Success add to favorite" : "Item already exist"

            res.status(201).json({ message })
        } catch (error) {
            next(error)
        }
    }

    static async getFavorite(req, res, next) {
        try {
            let list = await FavoriteMovie.findAll({ where: { userId: req.user.id } })

            res.status(200).json(list)
        } catch (error) {
            next(error)
        }
    }

    static async deleteFavorite(req, res, next) {
        try {
            let movie = await FavoriteMovie.findByPk(req.params.id)

            if (!movie) {
                throw { name: "A/N" }
            }

            res.status(200).json({ message: "item was successfully deleted" })
            await FavoriteMovie.destroy({ where: { id: req.params.id } })
        } catch (error) {
            next()
        }
    }

    static async updateFavorite(req, res, next) {
        try {
            const { title, overview, poster_path, backdrop_path, release_date, vote_average } = req.body
            let updated = (await FavoriteMovie.update({ title, overview, poster_path, backdrop_path, release_date, vote_average }, { where: { id: req.params.id }, returning: true }))[1][0]

            if (!updated) {
                throw { name: "A/N" }
            }

            res.status(200).json(updated)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = movieController