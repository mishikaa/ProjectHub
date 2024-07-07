import React from 'react';
import ProjectCard from './ProjectCard';
import './ProjectDisplay.css';

const ProjectsDisplay = ({ projects }) => {
  // console.log('Projects being passed to ProjectCard:', projects); // Log the projects being passed
  return (
    <div className="projects-container">
      {projects.map((project) => (
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
    </div>
  );
};

export default ProjectsDisplay;
