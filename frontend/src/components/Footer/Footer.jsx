import React from "react";
import { NavLink } from "react-router-dom";

function Footer(){
    return (
        <>
            <div className="w-full flex flex-col gap-10 bg-slate-100 pl-16 pt-16 pr-16 pb-1">
            <div className="w-full flex flex-row gap-32 bg-slate-100 pl-16 pr-16 pt-16 pb-0">
            <div className="flex flex-col gap-7">
                <h3 className="font-bold text-lg mb-2">SmartFood</h3>
                <p>Empowering sustainable, tech-driven food experiences.</p>
            </div>
            <div className="flex flex-col gap-7">
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="flex flex-col gap-2">
                <NavLink to="/about" className="hover:underline">About Us</NavLink>
                <NavLink to="/" className="hover:underline">Our Packaging</NavLink>
                <NavLink to="/contact" className="hover:underline">Contact Us</NavLink>
                </ul>
            </div>
            <div className="flex flex-col gap-7">
                <h4 className="font-semibold mb-2">Legal</h4>
                <ul className="flex flex-col gap-2">
                <NavLink to="#" className="hover:underline">Privacy Policy</NavLink>
                <NavLink to="#" className="hover:underline">Terms of Service</NavLink>
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <h4 className="font-semibold mb-2 ml-8">Connect</h4>
                <img className="w-full m-0" src="src\assets\bb3.png" alt="socials" />
            </div>
            </div>
            <div className="text-center text-sm mt-2 text-slate-400 mb-0 pb-0">&copy; {new Date().getFullYear()}
                SmartFood Solutions. All rights reserved.</div>
            </div>


            {/* <div className="w-screen h-60 flex flex-row justify-center items-center text-center bg-slate-100 p-20 gap-x-10 gap-y-20">
                <div className="flex gap-20 w-1/4">
                    <ul className='flex flex-col gap-y-7'>
                        <NavLink 
                        to="/"
                        className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Home</NavLink>
                        <NavLink
                        to="about"
                        className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>About Us</NavLink>
                        <NavLink
                        to="contact"
                        className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Contact Us</NavLink>
                    </ul>
                </div>        
                <div className="flex gap-20 w-1/4">
                    <ul className='flex flex-col gap-y-7'>
                        <li className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Insta</li>
                        <li className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Facebook Us</li>
                        <li className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>LinkedIn Us</li>
                    </ul>
                </div>        
                <div className="flex gap-20 w-1/4">
                    <ul className='flex flex-col gap-y-7'>
                        <li className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Email</li>
                        <li className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Reach Us</li>
                        <li className='rounded-3xl p-3 hover:text-white hover:bg-yellow-600'>Sponsors</li>
                    </ul>
                </div>        
            </div> */}
        </>
    )
}
export default Footer;