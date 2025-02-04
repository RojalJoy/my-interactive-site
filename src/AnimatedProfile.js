import React from "react";
import { motion } from "framer-motion";
import myImage from "./Images/Photo1.jpg";

const AnimatedProfile = ({ onViewPortfolio }) => {
    return (
        <motion.div 
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Background Animation */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* Floating Animated Image */}
            <motion.img
                src={myImage} alt="My Image"
                className="w-64 h-64 rounded-full shadow-lg z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.1 }}
            />

            {/* Animated Description with Stagger Effect */}
            <motion.div
                className="text-center mt-6 max-w-lg z-10"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
                }}
            >
                <motion.h1 className="text-3xl font-bold" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    Rojal Treesa Joy
                </motion.h1>
                <motion.p className="text-gray-300 mt-2" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                🚀 AI, Game Dev & Frontend Innovator 🎮💡

I craft immersive games, build AI-powered systems, and design dynamic frontends! From FPS shooters to smart security detection and interactive AR, I blend tech and creativity to bring ideas to life. Let’s build something amazing! 🔥
                </motion.p>
            </motion.div>

            {/* Call to Action Button */}
            <motion.button
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onViewPortfolio}
            >
                View Portfolio
            </motion.button>
        </motion.div>
    );
};

export default AnimatedProfile;
