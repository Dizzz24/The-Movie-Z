import axios from "../config/instance";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function DetailPage() {
    const [movieTrailer, setMovieTrailer] = useState([])
    const location = useLocation()
    const detailMovie = location.state;


    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://image.tmdb.org/t/p/original/${detailMovie.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const fetchMovieTrailer = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/movies/trailer/${detailMovie.id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setMovieTrailer(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMovieTrailer()
    }, [])

    return (
        <div className="h-screen flex items-center justify-center" style={backgroundStyle}>
            <div className="flex h-96 w-6/12">
                {/* Backdrop Image */}
                <img src={`https://image.tmdb.org/t/p/original/${detailMovie.poster_path}`} className="w-72 border border-gray-300 rounded p-1 bg-gray-500">

                </img>

                {/* Description Container */}
                <div className="flex-1 flex flex-col">
                    <div className="p-5">
                        <h1 className="text-3xl font-bold text-white">{detailMovie.title}</h1>
                        <p className="text-white mt-2 w-auto">{detailMovie.overview}</p>
                    </div>
                    <div className="p-5 flex-1 flex overflow-x-auto gap-2">
                        {movieTrailer.length && movieTrailer.map(link => (
                            <iframe
                                key={link}
                                className="h-full w-1/2 rounded-md"
                                width="100%"
                                height="100%"
                                src={link}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                style={{ maxWidth: "100%" }}
                            ></iframe>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
