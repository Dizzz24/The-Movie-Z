import { useState } from "react";
import axios from '../config/instance'
import Swal from 'sweetalert2'
import { PiWarningCircleLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const { data } = await axios({
                method: "post",
                url: "/register",
                data: input
            })

            Swal.fire("Success", "Success Register", "success")

            navigate("/login")
        } catch (error) {
            console.log(error);
            if (error.response.data?.message) {
                setErrors(error.response.data.message);
            } else {
                setErrors(["An error occurred"]);
            }
        }
    };


    const handleChange = (e) => {
        const { id, value } = e.target

        setInput({ ...input, [id]: value });
        // Reset pesan kesalahan setelah ada perubahan pada input
        setErrors(errors.filter(error => error !== "Use the right email format!" && error !== "Email is required"));
    }

    return (
        <div className="h-screen bg-gray-800 flex justify-center items-center">
            <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl text-center pt-2 font-medium text-gray-100 dark:text-white">Sign Up</h5>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your username</label>
                        <input type="text" id="username" value={input.username} onChange={handleChange} className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="someone" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your email</label>
                        <input type="text" id="email" value={input.email} onChange={handleChange} className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@mail.com" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your password</label>
                        <input type="password" id="password" value={input.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Regist new account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have account? <Link to={"/login"} className="text-blue-700 hover:underline dark:text-blue-500">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
