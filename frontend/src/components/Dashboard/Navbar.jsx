import React from 'react';
import './Navbar.css';
import { FaSearch, FaBell } from 'react-icons/fa';

const Navbar = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="navbar">
      <div className="sidebar-logo">ProjectHub</div>
      <div className='right-section'>
        <div className="search-bar">
          <input type="text" placeholder="Search for anything..." />
          <FaSearch className="search-icon" />
        </div>
        <div className="user-info">
          <FaBell className="notification-icon" />
          <img
            src={user.image}
            alt="User avatar"
            className="user-avatar"
            onError={(e) => (e.target.src = 'https://avatars.dicebear.com/api/initials/default.svg')}
            title={user.displayName} // Display user's name on hover
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
