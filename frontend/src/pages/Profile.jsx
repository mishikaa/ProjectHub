import React, { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
        <div>
          <Navbar user={user} />
          <div>Loading...</div> // Handle loading state
        </div>

    )
  }

  return (
    <div className="profile-card">
      <img src={user.image} alt="User profile" />
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
};

export default Profile;
