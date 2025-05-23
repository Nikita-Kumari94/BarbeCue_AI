import React from "react";
import Typewriter from '../Typewriter.jsx';

function About(){
    const slogans = [
        { text: 'Innovate Food Services.', className: '' },
        { text: 'Revolutionize Facilities.', className: '' },
        { text: 'Smart Predictions, No Waste.', className: '' },
    ];

    return (
        <>
            <div className="text-2xl font-mono text-center mt-20 text-green-800">
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
            <div className="opacity-5 absolute z-40 right-10 top-40">
            <img className='w-48 mt-40' src="src\assets\bb4.png" alt="Logo" /> 
            </div>
            
                <div className='flex flex-row w-full bg-transparent text-black justify-start items-end pl-28 pt-20 pb-0 mb-0 mt-4'>
                    <div className='w-3/4 pl-2 pt-6 pb-0 h-auto text-sm'>
                        <h2 className="text-3xl font-bold mb-8">About Us</h2>
                        <p className="text-lg">We are a technology-driven team passionate about revolutionizing the food industry. Our mission is to make food services smarter, cleaner, and more sustainable for a better future.</p>
                    </div>
                </div>
                <div className='flex flex-row bg-transparent text-black justify-center items-center pl-20 pr-14 pb-20 pt-0 ml-4 mr-1 mb-0 gap-20 mt-none'>
                    <div className='w-1/2 pt-6 pb-0 pl-6 h-auto text-sm'>
                        <div className="pr-0">
                            <p className="text-lg max-w-3xl mb-4">Our platform leverages cutting-edge AI to forecast food demand accurately, enabling suppliers to optimize resources and reduce waste. We believe personalization is key — not only in the meals we offer but in the experiences we create through seamless digital interactions and queue management.</p>
                            <p className="text-lg max-w-3xl mb-4">Environmental consciousness is at the heart of what we do. Through innovative eco-packaging solutions, we strive to minimize our ecological footprint and inspire a new standard in the food industry. Join us as we reshape the way the world consumes — intelligently and sustainably.</p>
                            <p className="text-lg max-w-3xl mb-0">Our journey started with a vision to merge technology with sustainability. With a dedicated team of food tech innovators, designers, and data scientists, we're working to set a benchmark in eco-conscious, data-informed food service that benefits communities and the planet alike.</p>
                        </div>
                    </div>
                    <div className='w-1/2 h-auto p-2 border-t-2 border-l-2 border-double border-yellow-800'>
                        <img className="w-full bg-cover rounded-sm" src="https://rotacloud.com/img/https%3A%2F%2Fblog.rotacloud.com%2Fcontent%2Fimages%2F2022%2F08%2Ftony-lee-8IKf54pc3qk-unsplash-1.jpg;width=620" alt="" />
                    </div>
                </div>

                <div className="mt-1 text-center mb-20">
                <h2 className="text-xl font-semibold mb-2">Find SmartFood Zones Near You</h2>
                <input
                    className="p-4 border rounded-lg w-full max-w-md"
                    placeholder="Search by city or ZIP"
                />
                </div>

                <div className="p-24 ml-4 mr-4 mt-0 mb-0">
                    <h2 className="text-3xl font-bold mb-10">Our Packaging</h2>
                    <p className="text-lg max-w-3xl mb-8">Our packaging is designed with minimalism and sustainability in mind. All our containers are biodegradable, recyclable, and contribute to zero-waste goals.</p>
                    <div className="pt-20 pl-16 pr-16 bg-green-50 min-h-screen flex flex-col gap-8">
                        <h2 className="text-4xl font-bold text-green-900 mb-6">Clean, Green, Minimal Packaging</h2>
                        <div className="max-w-4xl text-lg text-gray-800 space-y-5">
                        <p>
                            At <strong>SmartFood</strong>, we believe great packaging should protect the planet as much as it protects your food. That’s why every container, wrapper, and label we use is crafted from 100% biodegradable or recyclable materials — ensuring your meal leaves no harmful trace.
                        </p>

                        <div className="grid md:grid-cols-3 gap-12 mt-6 justify-center align-middle pl-20">
                            <div className="bg-white border shadow rounded-lg p-5">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Minimal Waste</h3>
                            <p>
                                Our packaging designs follow the "less is more" principle — using only what's necessary, without compromising on safety or style.
                            </p>
                            </div>

                            <div className="bg-white border shadow rounded-lg p-5">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Eco Materials</h3>
                            <p>
                                We source plant-based plastics, recycled paper, and compostable inks to minimize environmental impact at every step.
                            </p>
                            </div>

                            <div className="bg-white border shadow rounded-lg p-5">
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Smart Design</h3>
                            <p>
                                Each package is engineered for space efficiency, thermal insulation, and ease of recycling — a win for you and the planet.
                            </p>
                            </div>
                        </div>
                        <p>
                            Together, we’re redefining food delivery. Join us in making sustainability the standard, one meal at a time.
                        </p>
                        </div>
                    </div>
                </div>
            
        </>
    )
}

export default About;