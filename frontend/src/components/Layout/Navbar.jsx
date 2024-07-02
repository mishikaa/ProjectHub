import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
        <header className="header">
          <div className="logo">ProjectHub</div>
          <nav className="nav">
            <Link to="/about">About</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user/signin" className="signup">Sign In</Link>
          </nav>
        </header>
  )
}

export default Navbar