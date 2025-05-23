import React, { useState, useEffect } from 'react';
import Typewriter from '../Typewriter.jsx';
import { NavLink } from 'react-router-dom';

function Home() {
    const fullText = 'BarbeCue AI.';
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!deleting && subIndex <= fullText.length) {
                setSubIndex((prev) => prev + 1);
            } else if (deleting && subIndex >= 0) {
                setSubIndex((prev) => prev - 1);
            }

            if (subIndex === fullText.length && !deleting) {
                setTimeout(() => setDeleting(true), 1000);
            } else if (subIndex === 0 && deleting) {
                setDeleting(false);
            }
        }, deleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, deleting]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
        setError('Please enter a ZIP code.');
        setSearchResults([]);
        return;
        }
        setError('');
        setLoading(true);
        try {
        const response = await fetch(`http://localhost:5000/api/restaurants?zip_code=${searchQuery.trim()}`);
        if (!response.ok) throw new Error('Network response not ok');
        const data = await response.json();
        setSearchResults(data.length ? data : []);
        if (!data.length) setError('No results found.');
        } catch (err) {
        setError('Failed to fetch results. Please try again.');
        setSearchResults([]);
        } finally {
        setLoading(false);
        }
    };


    const current = fullText.substring(0, subIndex);

    const renderColoredText = () => {
        return (
            <span className="text-7xl font-bold font-mono">
                {current.length <= 5 && <span className="text-blue-500">{current}</span>}
                {current.length > 5 && current.length <= 8 && (
                    <>
                        <span className="text-blue-500">{current.slice(0, 5)}</span>
                        <span className="text-blue-600">{current.slice(5)}</span>
                    </>
                )}
                {current.length > 8 && (
                    <>
                        <span className="text-blue-500">Barbe</span>
                        <span className="text-blue-600">{current.slice(5, 8)}</span>
                        <span className="text-purple-600">{current.slice(8)}</span>
                    </>
                )}
            </span>
        );
    };

    const slogans = [
        { text: 'Innovate Food Services.', className: '' },
        { text: 'Revolutionize Facilities.', className: '' },
        { text: 'Smart Predictions, No Waste.', className: '' },
    ];

    return (
        <>
            <div className='absolute z-0 w-full h-auto object-cover object-left'>
                <img src="src/assets/bb9.jpg" alt="bg-hero-section" />
            </div>

            <div className='relative'>
                <div className="flex justify-center items-center p-0 m-0 gap-0 opacity-20">
                    <img className='w-48 mt-72' src="src/assets/bb4.png" alt="Logo" />
                </div>

                <div className="flex justify-center text-6xl items-center pl-40 pr-40 pt-0 pb-2 mt-1 mb-2">
                    {renderColoredText()}
                    <span className="blinking-cursor"></span>
                </div>

                <div className='flex flex-col p-3 items-center text-lg pb-2 mt-10'>
                    <p className='p-3 text-slate-700'>Makes your serving simple & easy.</p>
                </div>

                <div className='p-6 flex flex-row justify-center items-center pt-0 opacity-40'>
                    <div className='p-6 bg-slate-50 rounded-2xl w-2/3 h-auto flex flex-row justify-center'></div>
                </div>

                <div className="mt-8 text-center mb-7">
                    <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">
                        Join the Future of Smart & Sustainable Eating
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Discover AI-driven food services and management, personalized meals & eco-conscious packaging — all in one place.
                    </p>
                    <NavLink
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl shadow-md transition duration-300"
                        to="/login"
                        >
                        Get Started
                    </NavLink>
                </div>
                

                <div className="mt-32 text-center mb-20 px-4 pt-1">
                <h2 className="text-2xl font-semibold mb-4 mt-14">Find SmartFood Zones Near You</h2>

                <div className="flex justify-center items-center flex-row gap-3 max-w-md mx-auto mb-6 mt-10">
                    <input
                    className="p-4 border rounded-lg w-full"
                    type="text"
                    placeholder="Enter ZIP Code (e.g. 123456)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`bg-blue-600 text-white px-6 py-3 rounded transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    >
                    {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <ul className="mt-4 text-left max-w-md mx-auto border rounded-lg overflow-hidden shadow-lg">
                    {searchResults.map((place, index) => (
                    <li
                        key={index}
                        className="border-b last:border-b-0 py-3 px-4 hover:bg-gray-100 cursor-pointer transition"
                        onClick={() => alert(`You clicked on ${place.name}`)}
                    >
                        <strong>{place.name}</strong> — {place.address}
                    </li>
                    ))}
                </ul>
                </div>



                

                <div className="text-2xl font-mono text-center mt-5 text-orange-800">
                    <Typewriter
                        words={slogans}
                        render={(text) => (
                            <>
                                {text}
                                <span className="blinking-cursor">|</span>
                            </>
                        )}
                    />
                </div>

                <div className='flex flex-row bg-transparent text-black font-xl justify-center items-center pt-20 pl-40 pr-40 pb-14 m-4 gap-40'>
                    <div className='w-1/2 h-auto p-2 border-t-2 border-l-2 border-double border-yellow-800'>
                        <img className="w-full bg-cover rounded-sm" src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/24115640/Untitled-design-2022-02-18T123717.280.jpg" alt="" />
                    </div>
                    <div className="p-8">
                        <h2 className="text-3xl font-bold mb-4">Search Eco-Friendly Food Areas</h2>
                        <p className="text-gray-600">Now featuring real-time results from nearby smart restaurants and sustainable food hubs.</p>
                    </div>
                </div>

                <div className="mt-16 px-20 mb-16">
                    <h2 className="text-4xl font-bold mb-14 text-center text-black">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-green-100">
                            <div className="text-green-600 mb-4 text-5xl">🔍</div>
                            <h3 className="text-2xl font-semibold mb-3">Predict</h3>
                            <p className="text-gray-600">We use real-time data and AI to forecast food demand, cutting down on waste and keeping kitchens efficient.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-green-100">
                            <div className="text-green-600 mb-4 text-5xl">🍽️</div>
                            <h3 className="text-2xl font-semibold mb-3">Personalize</h3>
                            <p className="text-gray-600">Menus are tailored to your taste, allergies, and health goals — making every meal both smart and satisfying.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-green-100">
                            <div className="text-green-600 mb-4 text-5xl">🌿</div>
                            <h3 className="text-2xl font-semibold mb-3">Package</h3>
                            <p className="text-gray-600">We deliver your meals in biodegradable, minimalistic packaging — good for your body and the planet.</p>
                        </div>
                    </div>
                </div>


                <div className="bg-green-100 p-10 rounded-3xl mb-8 text-center">
                    <h1 className="text-5xl font-bold mb-8 text-green-900">Smarter, Greener, Tastier</h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
                        Experience the future of food with intelligent demand prediction, personalized meals, and sustainable packaging — all in one place.
                    </p>
                    <a href="#" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                        Discover Eco-Friendly Spots
                    </a>
                </div>

                <div className="pl-32 pr-28 pb-10 mt-32 mb-16">
                    <h1 className="text-4xl font-bold mb-4">Smart Food Solutions</h1>
                    <p className="text-lg mb-6 max-w-3xl">An intuitive platform addressing three key aspects of future food services: predictive demand analytics, personalized meals, and sustainable packaging — all integrated into a single experience.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 shadow rounded bg-white border">
                            <h2 className="text-xl font-semibold mb-2">Predict Demand</h2>
                            <p>AI-powered insights help vendors plan better and reduce food waste.</p>
                        </div>
                        <div className="p-4 shadow rounded bg-white border">
                            <h2 className="text-xl font-semibold mb-2">Customized Food</h2>
                            <p>Tailored meals and smart queue handling reduce wait time and enhance satisfaction.</p>
                        </div>
                        <div className="p-4 shadow rounded bg-white border">
                            <h2 className="text-xl font-semibold mb-2">Sustainable Packaging</h2>
                            <p>Eco-friendly, minimal waste packaging designed for the green-conscious consumer.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;