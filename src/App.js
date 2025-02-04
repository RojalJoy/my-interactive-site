import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AnimatedProfile from "./AnimatedProfile";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

function App() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Home route toggles between profile and project list */}
        <Route
          path="/"
          element={
            !showProjects ? (
              <AnimatedProfile onViewPortfolio={() => setShowProjects(true)} />
            ) : (
              <ProjectList />
            )
          }
        />

        {/* Fix the route path to match the links in ProjectList */}
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
