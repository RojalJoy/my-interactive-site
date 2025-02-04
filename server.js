const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "projects.json");

// Helper function to read data
const readProjects = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

// Helper function to write data
const writeProjects = (projects) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

// Get all projects
app.get("/api/projects", (req, res) => {
    const projects = readProjects();
    res.json(projects);
});

// Get a single project by ID
app.get("/api/projects/:id", (req, res) => {
    const projects = readProjects();
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
});

// Add a new project
app.post("/api/projects", (req, res) => {
    const projects = readProjects();
    const newProject = { id: Date.now(), ...req.body }; // Unique ID
    projects.push(newProject);
    writeProjects(projects);
    res.status(201).json(newProject);
});

// Update an existing project
app.put("/api/projects/:id", (req, res) => {
    let projects = readProjects();
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: "Project not found" });
    }

    projects[index] = { ...projects[index], ...req.body };
    writeProjects(projects);
    res.json(projects[index]);
});

// Delete a project
app.delete("/api/projects/:id", (req, res) => {
    let projects = readProjects();
    const filteredProjects = projects.filter(p => p.id !== parseInt(req.params.id));

    if (projects.length === filteredProjects.length) {
        return res.status(404).json({ error: "Project not found" });
    }

    writeProjects(filteredProjects);
    res.json({ message: "Project deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
