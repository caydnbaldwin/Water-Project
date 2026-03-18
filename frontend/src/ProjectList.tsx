import { useEffect, useState } from "react";
import type { Project } from "./types/Project";

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((category) => `projectType=${encodeURIComponent(category)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
      );
      const data = await response.json();
      setProjects(data.projects);
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  return (
    <>
      {projects.map((project) => (
        <div id="projectCard" className="card" key={project.projectId}>
          <h3 className="card-title">{project.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type: </strong>
                {project.projectType}
              </li>
              <li>
                <strong>Regional Program: </strong>
                {project.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact: </strong>
                {project.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Project Phase: </strong>
                {project.projectPhase}
              </li>
              <li>
                <strong>Project Status: </strong>
                {project.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <div>
        <button
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, numPage) => (
          <button
            key={numPage + 1}
            onClick={() => setPageNum(numPage + 1)}
            disabled={pageNum === numPage + 1}
          >
            {numPage + 1}
          </button>
        ))}
        <button
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(size) => {
            setPageSize(Number(size.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
