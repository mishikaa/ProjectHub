import React, { useState } from 'react';
import './Sidebar.css';
import { FaProjectDiagram, FaTasks, FaClipboardList, FaChartLine, FaCog, FaCreativeCommons, FaBars } from 'react-icons/fa';

const Sidebar = ({ setActiveComponent, setHeading, activeComponent }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
        <ul className="sidebar-menu">
          <li className={activeComponent === 'Project' ? 'active' : ''} onClick={() => { setActiveComponent('Project'); setHeading('Projects'); toggleSidebar(); }}>
            <FaProjectDiagram /> Project
          </li>
          <li className={activeComponent === 'CreateProject' ? 'active' : ''} onClick={() => { setActiveComponent('CreateProject'); setHeading('Create Project'); toggleSidebar(); }}>
            <FaCreativeCommons /> Create Project
          </li>
          <li className={activeComponent === 'Tasks' ? 'active' : ''} onClick={() => { setActiveComponent('Tasks'); setHeading('Tasks'); toggleSidebar(); }}>
            <FaTasks /> Tasks
          </li>
          <li className={activeComponent === 'WorkLogs' ? 'active' : ''} onClick={() => { setActiveComponent('WorkLogs'); setHeading('Work Logs'); toggleSidebar(); }}>
            <FaClipboardList /> Work Logs
          </li>
          <li className={activeComponent === 'Performance' ? 'active' : ''} onClick={() => { setActiveComponent('Performance'); setHeading('Performance'); toggleSidebar(); }}>
            <FaChartLine /> Performance
          </li>
          <li className={activeComponent === 'Settings' ? 'active' : ''} onClick={() => { setActiveComponent('Settings'); setHeading('Settings'); toggleSidebar(); }}>
            <FaCog /> Settings
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
