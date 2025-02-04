import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/projects")
            .then(response => setProjects(response.data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Link 
                        key={project.id} 
                        to={`/project/${project.id}`}  // ✅ Ensure this matches App.js
                        className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition"
                    >
                        <h2 className="text-xl font-semibold">{project.Title}</h2>
                        <p className="text-gray-400 mt-2">{project.Description.substring(0, 100)}...</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
