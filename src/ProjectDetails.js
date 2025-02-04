import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/projects/${id}`)
            .then(response => {
                setProject(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching project details:', error);
                setError('Failed to load project details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <motion.div 
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Project Title */}
            <motion.h1 
                className="text-4xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {project.Title}
            </motion.h1>

            {/* Project Image */}
            {project.images ? (
                <img 
                    src={project.images} 
                    alt={project.Title} 
                    className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg mb-6"
                />
            ) : (
                <img 
                    src="https://via.placeholder.com/600x400?text=No+Image" 
                    alt="Placeholder" 
                    className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-lg mb-6"
                />
            )}

            {/* Project Description */}
            <motion.p 
                className="text-gray-300 text-lg text-center max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {project.Description}
            </motion.p>

            {/* Project Links */}
            <div className="mt-6 flex gap-4">
                {project.Links && (
                    <a 
                        href={project.Links} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition"
                    >
                        View Live Project
                    </a>
                )}

                {project.SourceCode && (
                    <a 
                        href={project.SourceCode} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold transition"
                    >
                        View Source Code
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectDetails;
