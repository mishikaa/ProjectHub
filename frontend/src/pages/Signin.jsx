import React, { useEffect, useState } from 'react';
import './Signin.css';

const Signin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
          // console.log("User Data Fetched:", data);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container">
      <div className="left-container">
        <img src="/images/login.png" alt="Illustration" className="illustration" />
      </div>
      <div className="right-container">
        <h1>Welcome To ProjectHub</h1>
        <p className="subtitle">Please sign in using one of the following methods.</p>
        <div className="form">
          <a className="social-button google" href="http://localhost:3000/auth/google">Sign in with Google</a>
          <button className="social-button facebook">Sign in with Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
