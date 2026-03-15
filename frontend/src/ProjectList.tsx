import { useEffect, useState } from "react";
import type { Project } from "./types/Project";

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("https://localhost:5000/api/Water/AllProjects");
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []
  );

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      
      {projects.map((project) =>
        <div id="projectCard">
          <h3>{project.projectName}</h3>

          <ul>
            <li>Project Type: {project.projectType}</li>
            <li>Regional Program: {project.projectRegionalProgram}</li>
            <li>Impact: {project.projectImpact} Individuals Served</li>
            <li>Project Phase: {project.projectPhase}</li>
            <li>Project Status: {project.projectFunctionalityStatus}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProjectList;