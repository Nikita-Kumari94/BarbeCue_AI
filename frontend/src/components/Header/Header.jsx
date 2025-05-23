import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Link,NavLink } from "react-router-dom";
import Chat from '../Chat/Chat.jsx';


function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateLoginStatus = () => {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        };

        window.addEventListener("storage", updateLoginStatus);
        updateLoginStatus();

        return () => {
            window.removeEventListener("storage", updateLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userType");
        setIsLoggedIn(false);
        navigate('/');
    };
    useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        navigate("/");
    }
    }, []);

    const handleStart = () => {
    window.location.href = 'http://localhost:5000/predict';
    };


    return(
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between bg-slate-100 p-6 rounded-xl shadow-md">
            <div className="flex flex-row text-2xl font-bold text-gray-800 ml-4">
                <img className="w-12 h-auto" src="src\assets\bb4.png" alt="" />
                <NavLink to="/">BarbeCueAI</NavLink>
            </div>

            <ul className="flex gap-9 font-semibold text-gray-700 text-lg">
                <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                    `hover:text-blue-600 p-2 rounded-2xl hover:bg-slate-200 transition ${isActive ? "text-blue-800" : "text-gray-700"}`
                    }
                >
                    Home
                </NavLink>
                </li>
                <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                    `hover:text-blue-600 p-2 rounded-2xl hover:bg-slate-200 transition ${isActive ? "text-blue-800" : "text-gray-700"}`
                    }
                >
                    About
                </NavLink>
                </li>
                <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                    `hover:text-blue-600 p-2 rounded-2xl hover:bg-slate-200 transition ${isActive ? "text-blue-800" : "text-gray-700"}`
                    }
                >
                    Contact
                </NavLink>
                </li>
            </ul>


            <div className="flex gap-8 items-center mr-4">
                {isLoggedIn ? (
                    <Link
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                    Logout
                    </Link>
                ) : (
                    <Link
                    to="/login"
                    className="text-red-500 px-4 py-2 rounded hover:bg-slate-300"
                    >
                    Login
                    </Link>
                )}
                
                <NavLink
                // to="http://localhost:5000/predict"
                to="http://127.0.0.1:5000/"
                className="bg-yellow-800 text-white font-bold py-2 px-4 rounded-2xl hover:bg-yellow-700 transition"
                // onClick={handleStart}
                >
                Get Started
                </NavLink>
            </div>
            </nav>
            
            <Chat />
        </>
    )
}
export default Header;