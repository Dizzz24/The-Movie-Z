import { useEffect, useState } from "react";
import axios from '../config/instance'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";

export default function EditPage() {

    const navigate = useNavigate()
    const location = useLocation()
    const detail = location.state

    const [errors, setErrors] = useState([])
    const [input, setInput] = useState({
        title: "",
        overview: "",
        poster_path: "",
        backdrop_path: "",
        release_date: "",
        vote_average: ""
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const { data } = await axios({
                method: "post",
                url: `/favorites/update/${detail.id}`,
                data: input,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                }
            })

            console.log(data, "ini pak")
            Swal.fire("Success", "Success add data", "success")

            navigate("/favorites")
        } catch (error) {
            const errors = error.response?.data.message
            console.log(error);
            if (errors) {
                Swal.fire("Error", errors, "error")
                setErrors(errors);
            } else {
                setErrors(["An error occurred"]);
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target
        setInput({ ...input, [id]: value })
    }

    useEffect(() => {
        setInput((prevInput) => ({
            ...prevInput,
            ...detail
        }));
    }, [detail]);

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="">
                        <h5 className="text-xl text-center pt-2 font-medium text-gray-100 dark:text-white">Update Movie</h5>
                    </div>
                    <ul>
                        {errors.length > 1 && errors.map((error, i) => <li key={i} className="text-red-500">{error}</li>)}
                    </ul>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Title</label>
                        <input type="text" id="title" value={input.title} onChange={handleChange} className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="overview" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Overview</label>
                        <input type="text" id="overview" value={input.overview} onChange={handleChange} className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="poster_path" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Poster Path</label>
                        <input type="text" id="poster_path" value={input.poster_path} onChange={handleChange} placeholder="" className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="poster_path" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Poster Path</label>
                        <input type="text" id="poster_path" value={input.backdrop_path} onChange={handleChange} placeholder="" className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="poster_path" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Poster Path</label>
                        <input type="text" id="poster_path" value={input.release_date} onChange={handleChange} placeholder="" className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="poster_path" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Poster Path</label>
                        <input type="text" id="poster_path" value={input.vote_average} onChange={handleChange} placeholder="" className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                </form>
            </div>
        </div>
    );
};
