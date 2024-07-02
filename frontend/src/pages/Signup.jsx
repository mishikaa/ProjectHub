import React, { useEffect, useState } from "react";
import "./Signup.css";

const ROLES = {
  ADMIN: 'ADMIN',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  TEAM_LEAD: 'TEAM_LEAD',
  DEVELOPER: 'DEVELOPER',
  TESTER: 'TESTER',
  CLIENT: 'CLIENT',
  GUEST: 'GUEST'
};

const Signup = () => {
  const [role, setRole] = useState(""); // State to hold the selected role

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(role);
    try {
      const response = await fetch("http://localhost:3000/user/update/role", {
        method: "PATCH",
        body: JSON.stringify({
          role,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        window.location.href = "/dashboard"; // Redirect on success
      } else {
        alert("Failed to update role. Please try again.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error updating role. Please try again.");
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
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
          const jsData = JSON.stringify(data); 
          localStorage.setItem("user", jsData);
          setUser(jsData);
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
      <div className="card">
        <h6 className="h3">Choose your role</h6>
        <form className="role-form" onSubmit={handleSubmit}>
          <div className="custom-control">
            {Object.entries(ROLES).map(([key, value]) => (
              <div key={key}>
                <input
                  type="radio"
                  id={`${value}-role`}
                  name="role"
                  required
                  value={value}
                  className="custom-radio-input"
                  onChange={handleRoleChange}
                />
                <label
                  className="custom-radio-label"
                  htmlFor={`${value}-role`}
                >
                  {value.replace('_', ' ').toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
          <button type="submit" className="btn">
            Create my account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
