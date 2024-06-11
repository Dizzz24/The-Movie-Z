import { Link } from "react-router-dom";
import { format } from 'date-fns';
import MovieRating from "../components/MovieRating";
import axios from "../config/instance";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "../store/features/fetchMovies";


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
                    url: `/favorites/delete/${movie.id}`,
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
                }, 500);
            }
        } catch (error) {
            console.log(error)
            Swal.fire("Failed!", error.data?.message, "error")
        }
    }

    return (
        <div title={movie.title} className="w-72 border border-gray-300 rounded p-1 bg-gray-500">
            <div className="image">
                <div className="wrapper glyphicons_v2 picture grey no_image_holder">
                    <Link to={'/detail'} state={movie} title={movie.title}>
                        <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                            <img className="poster w-[100%] rounded" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} style={{ objectFit: "cover" }} alt={movie.title} />
                        </figure>
                    </Link>
                </div>
                <div className="options" data-id={movie.id} data-object-id={movie.object_id} data-media-type="movie" data-role="tooltip">
                    <a className="no_click" href="#"><div className="glyphicons_v2 circle-more white"></div></a>
                </div>
            </div>

            <div className="p-4">
                <h2><Link to={'/detail'} state={movie} title={movie.title} className="text-lg font-bold text-white">{movie.title}</Link></h2>
                <div className="flex items-center justify-between mt-auto">
                    <p className="font-medium">Rating:</p>
                    <MovieRating rating={Math.ceil(movie.vote_average) / 2} />
                </div>
                <p className="text-sm text-gray-400">{format(new Date(movie.release_date), 'd MMM yyyy')}</p>
            </div>

            {type === "favorite" ? (
                <>
                    <Link to={'/edit'} state={movie} className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  text-yellow-500 rounded-lg group hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-yellow-500">
                            Edit
                        </span>
                    </Link>
                    <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  text-red-500 rounded-lg group hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={handleDelete}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-red-500">
                            Delete
                        </span>
                    </button>
                </>
            ) : (
                <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={addToFavorite}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add to Favorite
                    </span>
                </button>
            )}
        </div>
    );
}