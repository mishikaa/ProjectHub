import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, projectType, startDate, endDate, description, projectRoles = [], onClick }) => {
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? 'Invalid Date' : parsedDate.toLocaleDateString();
  };

  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-header">
        <h3>{title}</h3>
        <span className="status">{projectType}</span>
      </div>
      <p className="project-description">{description}</p>
      <div className="project-footer">
        <span className="deadline">Start Date: {formatDate(startDate)}</span>
        <span className="deadline">End Date: {formatDate(endDate)}</span>
        <div className="team">
          {projectRoles.map((role, index) => (
            <div key={index} className="team-member">
              <img
                src={role.member.image}
                alt={`${role.member.firstName} ${role.member.lastName}`}
                className="team-avatar"
                onError={(e) => (e.target.src = `https://api.dicebear.com/9.x/initials/svg?seed=${role.member.firstName}+${role.member.lastName}`)}
              />
              <span className="team-member-name">{`${role.member.firstName} ${role.member.lastName}`}</span>
            </div>
          ))}
        </div>
        <span className="issues">{projectRoles.length} roles</span>
      </div>
    </div>
  );
};

export default ProjectCard;
