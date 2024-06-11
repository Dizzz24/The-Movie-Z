import { useEffect, useState } from "react";
import Card from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchGenres } from "../store/features/fetchMovies";

export default function Home() {
    const dispatch = useDispatch();

    const movies = useSelector(state => state.movies.data);

    const genres = useSelector(state => state.movies.result.genres);

    const [query, setQuery] = useState({
        search: "",
        page: 1,
        genreId: "",
    });

    const fetchMov = async () => {
        try {
            await dispatch(fetchMovies(query));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGen = async () => {
        try {
            await dispatch(fetchGenres());
        } catch (error) {
            console.log(error);
        }
    };

    const handlerSearch = e => {
        e.preventDefault();
        query.page = 1;
        fetchMov();
    }

    const handlerGenreChange = (e) => {
        const selectedGenreId = e.target.value;
        query.page = 1;
        setQuery({ ...query, genreId: selectedGenreId });
    };


    const nextPage = () => {
        if (query.page < movies.total_pages) {
            setQuery({ ...query, page: query.page + 1 });
            console.log(query.page, "sekarang");
        }
    };

    const prevPage = () => {
        if (query.page > 1) {
            setQuery({ ...query, page: query.page - 1 });
        }
    };

    useEffect(() => {
        fetchMov();
        fetchGen();
    }, [query.page, query.genreId]);

    return (
        <>
            <div className="min-h-screen bg-gray-900 dark:bg-gray-800 flex flex-col items-center justify-center gap-3">
                <form className="w-6/12 mt-24 mb-5 relative" onSubmit={handlerSearch}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative flex gap-2">
                        <select className="text-sm text-gray-900 dark:text-white border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500" onChange={handlerGenreChange} >
                            <option value="">-- Genre --</option>
                            {genres && genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sticky top-0" placeholder="Search movie name..." value={query.search} onChange={e => setQuery({ ...query, search: e.target.value })} />
                        <button type="submit" className="text-white absolute end-3 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-4">
                    {movies?.results && movies.results.map((movie, i) => <Card key={i} movie={movie} />)}
                </div>

                <div className="flex items-center justify-center mt-3 mb-5">
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800" onClick={prevPage} disabled={query.page === 1}>{"<"}</button>
                    <input type="text" className="px-4 py-2 text-center bg-gray-200 text-gray-900 rounded-lg w-16 mx-2" value={query.page} disabled />
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800" onClick={nextPage} disabled={query.page === movies.total_pages}>{">"}</button>
                </div>
            </div>

        </>
    )
}