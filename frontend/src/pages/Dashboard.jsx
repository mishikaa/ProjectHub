import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import './Dashboard.css';
import Navbar from '../components/Dashboard/Navbar';
import ProjectDetails from '../components/Project/ProjectDetails';
import CreateProject from '../components/Project/CreateProject';
import Performance from '../components/Dashboard/Performance';
import CreateTask from '../components/Dashboard/CreateTask';
import ReportGenerator from '../components/ReportGenerator';
import Profile from './Profile';

const Dashboard = () => {
  const [heading, setHeading] = useState("Projects");
  const [activeComponent, setActiveComponent] = useState("Project");
  const [user, setUser] = useState(null);  
  
  const handleCreateProject = () => {
    setActiveComponent("CreateProject");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // console.log("user", storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Project":
        return <ProjectDetails onCreateProject={handleCreateProject} />;
      case "CreateProject":
        return <CreateProject />;
      case "Tasks":
        return <CreateTask />;
      case "WorkLogs":
        return <ReportGenerator />;
      case "Performance":
        return <Performance />;
      case "Settings":
        return <Profile />;
      default:
        return <ProjectDetails onCreateProject={handleCreateProject} />;
    }
  };

  return (
    <div className='dashboard'>
      <Sidebar setActiveComponent={setActiveComponent} setHeading={setHeading} activeComponent={activeComponent} />
      <div className="main-content">
        {user ? <Navbar user={user} /> : <div>Loading...</div>}
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
