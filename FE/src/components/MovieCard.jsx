import { Link } from "react-router-dom";
import { format } from 'date-fns';
import MovieRating from "../components/MovieRating";
import axios from "../config/instance";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchFavorites, fetchMovies } from "../store/features/fetchMovies";
import { GoBookmark } from "react-icons/go";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";

export default function Card({ movie, type }) {
    const dispatch = useDispatch()

    const addToFavorite = async () => {
        try {
            const { data } = await axios({
                method: "post",
                url: `/favorites/add`,
                data: movie,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                }
            });

            const icon = data.message.includes("Item already exist") ? "info" : "success";

            dispatch(fetchFavorites())
            dispatch(fetchMovies({ search: "", page: 1, genreId: "" }))

            Swal.fire("", data.message, icon);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const { data } = await axios({
                    method: "delete",
                    url: `/favorites/delete/${movie.idFav || movie.id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    },
                })

                Swal.fire({
                    title: "Deleted!",
                    text: `${data.message}`,
                    icon: "success"
                });

                setTimeout(() => {
                    dispatch(fetchFavorites())
                    dispatch(fetchMovies({ search: "", page: 1, genreId: "" }))
                }, 500);
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Failed!", error.data?.message, "error")
        }
    }

    function truncateText(text) {
        return text.length > 25 ? text.substring(0, 25) + '...' : text;
    }


    return (
        <div className="transition-transform duration-500 hover:scale-105 2xl:w-72">
            <Link to={'/detail'} state={movie}>
                <figure className="card relative bg-gray-300 bg-opacity-60 shadow-lg rounded-xl cursor-pointer text-black">
                    <img
                        className="poster w-full h-full transition-all duration-300 rounded-t-xl object-cover grayscale hover:grayscale-0"
                        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                        alt={movie.title}
                    />
                    <div className="absolute top-0 left-0 py-1 text-center rounded-br-xl rounded-tl-lg font-medium bg-blue-300 md:px-3 md:text-lg sm:px-2 sm:text-md px-1">
                        <h1 className="text-base">{format(new Date(movie.release_date || "2024-04-15"), 'd MMM yyyy')}</h1>
                    </div>
                </figure>
            </Link>
            <div className="bg-black bg-opacity-80 p-3 text-white text-xl font-bold rounded-b-xl md:text-lg sm:text-md flex justify-between items-center">
                <div className="">
                    <MovieRating className="" rating={Math.ceil(movie.vote_average) / 2} />
                    <h1 className="cursor-text font-poppins">{truncateText(movie.title)}</h1>
                </div>
                <div className="cursor-pointer">
                    {type === "favorite" ? (
                        <div className="flex justify-between">
                            <Link to={"/edit"}>
                                <TbEdit size={26} color="yellow" />
                            </Link>
                            <MdOutlineDelete size={26} color="red" onClick={handleDelete} />
                        </div>
                    ) : (
                        <>
                            {movie?.isFav ? (
                                <GoBookmarkFill size={26} onClick={handleDelete} />
                            ) : (
                                <GoBookmark size={26} onClick={addToFavorite} />
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}