import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch, FaBell, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ user, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    try {
      const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="navbar">
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="sidebar-logo">ProjectHub</div>
      <div className="right-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="user-info">
          <FaBell className="notification-icon" />
          <Link to={`/user/profile/${user._id}`}>
            <img
              src={user.image}
              alt="User avatar"
              className="user-avatar"
              onError={(e) => (e.target.src = 'https://avatars.dicebear.com/api/initials/default.svg')}
              title={user.displayName} // Display user's name on hover
            />
          </Link>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map(result => (
              <li key={result._id}>{result.title}</li> // Adjust based on your project or task structure
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
