import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../services/projectServices';
import './projectDetails.css'; // Note the change to this CSS file

const ProjectDetails = ({ onCreateProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = window.innerWidth < 768 ? 1 : 2;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-details">
      <div className='header-section'>
        <h2>Projects</h2>
        <button className="create-btn" onClick={onCreateProject}>
          Create
        </button>
      </div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <section className="project-card-container">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                projectType={project.projectType}
                startDate={project.startDate}
                endDate={project.endDate}
                description={project.description}
                projectRoles={project.projectRoles}
              />
            ))}
          </section>
          <div className="pagination">
            <button
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handleClick(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
