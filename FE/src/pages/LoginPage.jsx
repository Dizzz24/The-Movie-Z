import { useState, useEffect } from "react";
import axios from '../config/instance';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuote } from "../store/features/fetchQuote";

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const quotes = useSelector(state => state.quotes.data);

    const [unameOrEmail, setUnameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const { data } = await axios({
                method: "post",
                url: "/login",
                data: { unameOrEmail, password }
            });

            localStorage.access_token = data.access_token;
            Swal.fire("Success", "Success Login", "success");

            navigate('/')
        } catch (error) {
            console.log(error);
            Swal.fire("Error", error.response.data?.message, "error");
        }
    };


    async function handleCredentialResponse(response) {
        console.log(response.credential);
        console.log("mulai...");
        const { data } = await axios({
            method: 'post',
            url: '/loginGoogle',
            headers: {
                google_token: response.credential
            }
        });

        localStorage.access_token = data.access_token;
        Swal.fire("Success", "Success Login", "success");
        navigate('/')
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "848116665217-er2p58ch9hb80ck381mcbhia3ufa03dh.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("btnGoogle"),
            { theme: "outline", size: "large" }
        );

        return () => {
            window.onload = null;
        };
    });

    useEffect(() => {
        dispatch(fetchQuote())
    }, [])

    return (
        <>
            <div className="h-screen bg-gray-800 flex justify-center items-center flex-col">
                <div className="py-16">
                    {quotes.length > 1 && (
                        <p className="text-white text-3xl">{quotes[Math.floor(Math.random() * 10 - 1)].text}</p>
                    )}
                </div>
                <div className="w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl text-center pt-2 font-medium text-gray-100 dark:text-white">Sign in to Movie-Z</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your email or password</label>
                            <input type="text" id="email" value={unameOrEmail} onChange={(e) => setUnameOrEmail(e.target.value)} className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@mail.com" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-700 border border-gray-500 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    </form>
                    <div className="text-center my-4 flex justify-center items-center flex-wrap gap-2">
                        <div className="mx-3 text-sm font-medium text-gray-500 dark:text-gray-300">---------------OR---------------</div>
                        <button type="submit" id="btnGoogle" className=""></button>
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link to={"/register"} className="text-blue-700 hover:underline dark:text-blue-500">Sign up</Link>
                    </div>
                </div>
            </div >
        </>
    );
}
