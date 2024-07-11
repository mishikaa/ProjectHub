import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';
import ProfileCard from '../components/Profile/ProfileCard';
import WorkedWith from '../components/Profile/WorkedWith';
import Projects from '../components/Profile/Project';
import TotalWorkDone from '../components/Profile/TotalWorkDone';

const Profile = () => {
  const { id } = useParams(); // useParams hook to get the route parameters
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/profile/${id}`);
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/user/profile/${id}`, formData);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <div className="sidebar">
        <ProfileCard />
      </div>
      <div className="main-content">
        <WorkedWith />
        <Projects />
        <TotalWorkDone />
      </div>
    </div>
    // <div className="profile-container">
    //   <div className="profile-card">
    //     <div className="profile-image">
    //       <img src={user.image || 'https://via.placeholder.com/150'} alt="User Avatar" />
    //     </div>
    //     <div className="profile-details">
    //       {isEditing ? (
    //         <form onSubmit={handleSubmit}>
    //           <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
    //           <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
    //           <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
    //           <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
    //           <button type="submit">Save</button>
    //         </form>
    //       ) : (
    //         <>
    //           <h2>{user.firstName} {user.lastName}</h2>
    //           <p>{user.email}</p>
    //           <p>{user.phone}</p>
    //           <button onClick={() => setIsEditing(true)}>Edit Profile</button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
