const { FavoriteMovie } = require("../models")

const relatedUserOnly = async (req, res, next) => {
    try {
        const { id } = req.params

        if (isNaN(+id)) throw { name: "unauthorized" }

        let favoriteMovie = await FavoriteMovie.findByPk(req.params.id)

        if (!favoriteMovie) throw { name: "A/N" };
        
        req.user.id === favoriteMovie.userId ? next() : next({ name: "unauthorized" });
    } catch (error) {
        next(error);
    }
};

module.exports = relatedUserOnly
