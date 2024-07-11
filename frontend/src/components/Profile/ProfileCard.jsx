import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <img src="/path/to/image.jpg" alt="Profile" className="profile-image"/>
      <h2>Yash Ghori</h2>
      <p>Ahmedabad, Gujarat, India</p>
      <p>UI - Intern</p>
      <p>on-teak</p>
      <p>+91 7048144030</p>
      <p>yghori@asite.com</p>
      <p>PDT - I</p>
    </div>
  );
};

export default ProfileCard;
