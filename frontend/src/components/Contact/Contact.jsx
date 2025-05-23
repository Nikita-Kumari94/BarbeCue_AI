import React from "react";

function Contact(){
    return(
        <>
            <div className="flex flex-row pl-32 ml-10 gap-3 justify-center align-middle items-center pt-0 mt-0">
                <div className="pt-24 pb-24 pl-7">
                    <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                    <p className="text-lg mb-4">We'd love to hear from you! Reach out with questions, feedback or partnership inquiries.</p>
                    <form className="max-w-md space-y-4">
                    <input className="w-full border p-2 rounded" type="text" placeholder="Your Name" />
                    <input className="w-full border p-2 rounded" type="email" placeholder="Your Email" />
                    <textarea className="w-full border p-2 rounded" placeholder="Your Message" rows="5"></textarea>
                    <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Send Message</button>
                    </form>
                </div>
                <div>
                    <img className="w-1/2" src="src\assets\bb2.png" alt="Chat_icon" />
                </div>
            </div>
            <nav className='flex flex-wrap gap-32 bg-slate-100 p-1 w-full h-7'></nav>
            <div className='flex flex-row bg-transparent text-black justify-center items-center p-20 m-4 gap-40 mt-none border-4 border-double border-orange-800'>
                <div className='w-1/2 h-auto p-2 border-t-2 border-l-2 border-double border-orange-900'>
                    <img className="w-full bg-cover rounded-sm" src="https://cdn.magicdecor.in/com/2023/02/29202332/image-1686149346-597.jpg" alt="" />
                </div>
                <div className='bg-slate-50 w-1/2 p-6 h-auto text-sm border-r-2 border-b-2 border-double border-yellow-800 text-center'>
                    <p className='mb-8'>Reach Out to Us Anytime!</p>
                    <p className='mb-2 underline hover:bg-slate-200 p-2 rounded-lg'>@barbecue_ai_</p>
                    <p className='mb-10 underline hover:bg-slate-200 p-2 rounded-lg'>@whatsApp_barbeCueAI</p>
                    <p>We're ready to help.</p>
                </div>
            </div>
            <nav className='flex flex-wrap gap-32 bg-slate-100 p-1 w-full h-7 m-2'></nav>
        </>
    )
}

export default Contact;