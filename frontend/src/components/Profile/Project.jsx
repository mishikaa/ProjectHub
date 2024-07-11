import React from 'react';
import './Projects.css';

const projects = [
  { name: 'Emo stuff', image: '/path/to/image.jpg' },
  { name: 'Tim Burton', image: '/path/to/image.jpg' },
  { name: 'Halloween', image: '/path/to/image.jpg' },
  // Add more as needed
];

const Projects = () => {
  return (
    <div className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project">
            <img src={project.image} alt={project.name} />
            <p>{project.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
