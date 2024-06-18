import { useEffect, useState } from "react";
import Card from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchGenres, fetchFavorites } from "../store/features/fetchMovies";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropUpLine } from "react-icons/ri";

export default function Home() {
    const dispatch = useDispatch();

    const movies = useSelector(state => state.movies.data);

    const genres = useSelector(state => state.movies.result.genres);

    const [query, setQuery] = useState({
        search: "",
        page: 1,
        genreId: "",
    });
    const [showScroll, setShowScroll] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const fetchMov = async () => {
        try {
            dispatch(fetchMovies(query));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGen = async () => {
        try {
            dispatch(fetchGenres());
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
        dispatch(fetchFavorites())
        fetchMov();
        fetchGen();
    }, [query.page, query.genreId]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-900 dark:bg-gray-800 flex flex-col items-center justify-center gap-3">
                <form className="w-auto mt-24 mb-5 relative flex bg-gray-800 rounded-full p-2 border border-gray-300 font-poppins" onSubmit={handlerSearch}>
                    <select className="text-sm text-white dark:text-white border-none bg-gray-800 focus:ring-0 focus:outline-none flex-1 max-w-[30%]" onChange={handlerGenreChange}>
                        <option selected disabled>Genre</option>
                        {genres && genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full text-md font-poppins bg-gray-800 focus:ring-0 focus:border-none border-none outline-none text-white flex-1 max-w-[60%]"
                        placeholder="Search movie name..."
                        value={query.search}
                        onChange={e => setQuery({ ...query, search: e.target.value })}
                    />
                    <button type="submit" className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 max-w-[10%]">
                        <CiSearch size={24} />
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-8">
                    {movies?.results && movies.results.map((movie, i) => <Card key={i} movie={movie} />)}
                </div>

                <div className="flex items-center justify-center mt-3 mb-5">
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800" onClick={prevPage} disabled={query.page === 1}>{"<"}</button>
                    <input type="text" className="px-4 py-2 text-center bg-gray-200 text-gray-900 rounded-lg w-16 mx-2" value={query.page} disabled />
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800" onClick={nextPage} disabled={query.page === movies.total_pages}>{">"}</button>
                </div>
            </div>

            {showScroll && (
                <button
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
                    onClick={scrollToTop}
                >
                    <RiArrowDropUpLine size={42} />
                </button>
            )}
        </>
    )
}