import { useEffect } from "react";
import Card from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../store/features/fetchMovies";

export default function FavoriteMovie() {
    const dispatch = useDispatch();

    const favoriteMovies = useSelector(state => state.movies.favorites);

    const fetchFav = async () => {
        try {
            await dispatch(fetchFavorites());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFav();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-900 dark:bg-gray-800 flex flex-col items-center justify-center gap-3">
                {favoriteMovies.length === 0 && <h1 className="text-3xl text-white font-extrabold family-sans">You dont have any favorite movie</h1>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-4">
                    {favoriteMovies.map((movie, i) => <Card key={i} movie={movie} type="favorite" />)}
                </div>
            </div>

        </>
    )
}