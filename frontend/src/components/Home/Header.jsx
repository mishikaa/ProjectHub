import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ProjectHub</div>
      <nav className="nav">
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" className="login">Login</Link>
        <Link to="/signup" className="signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
