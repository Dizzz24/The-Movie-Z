import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure for logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes"
        });

        if (result.isConfirmed) {
            localStorage.clear()
            Swal.fire({
                title: "Done!",
                text: `Logout Success`,
                icon: "success"
            });

            setTimeout(() => {
                navigate('/login')
            }, 500);
        }
    }

    return (
        <nav className="bg-gray-900 dark:bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-600 dark:border-gray-700">
            <div className="w-screen flex items-center justify-between py-4 px-10">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <img src="" className="h-8" alt="Movie-z" /> */}
                    <span className="text-2xl font-semibold whitespace-nowrap font-bebas text-white dark:text-gray-200">The Movie-Z</span>
                </Link>
                <div className="flex items-center space-x-3 md:order-2">
                    <Link to={location.pathname != '/' ? "/" : "/favorites"} type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                        {location.pathname != '/' ? "Back to Home" : "Favorite movie"}
                    </Link>
                    <button type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
