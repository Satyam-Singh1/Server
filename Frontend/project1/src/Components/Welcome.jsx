import React from "react";
import { Link } from "react-router-dom";
import welcomeBg from "../assets/Welcom_bg.mp4"; // Import the video
import "./Welcome.css"
const Welcome = () => {
    return (
        <div className="relative h-screen flex justify-center items-center text-white font-josefin-sans">
            {/* Background Video */}
            <video
                className="welcome-video"
                autoPlay
                loop
                muted
            >
                <source src={welcomeBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for better text visibility */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative text-center p-7 backdrop-blur-sm rounded-lg shadow-2xl shadow-white flex flex-col items-center ">
                <h1 className="welcome-text">Welcome to <span>Testline</span></h1>
                <p className="text-xl mb-8">Get ready to test your knowledge!</p>

                {/* Glowing Start Quiz Button */}
                <div className="w-fit flex justify-center items-center">
                    <div className="relative inline-flex group">
                        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                        </div>
                        <Link to="/quiz">
                            <button className="relative inline-flex items-center justify-center px-8 py-4 text-md font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                Start Quiz
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;