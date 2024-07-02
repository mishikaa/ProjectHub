// src/components/Layout/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { FaProjectDiagram, FaTasks, FaClipboardList, FaChartLine, FaCog, FaCreativeCommons } from 'react-icons/fa';

const Sidebar = ({ setActiveComponent, setHeading, activeComponent }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className={activeComponent === 'Project' ? 'active' : ''} onClick={() => { setActiveComponent('Project'); setHeading('Projects'); }}>
          <FaProjectDiagram /> Project
        </li>
        <li className={activeComponent === 'CreateProject' ? 'active' : ''} onClick={() => { setActiveComponent('CreateProject'); setHeading('Create Project'); }}>
          <FaCreativeCommons /> Create Project
        </li>
        <li className={activeComponent === 'Tasks' ? 'active' : ''} onClick={() => { setActiveComponent('Tasks'); setHeading('Tasks'); }}>
          <FaTasks /> Tasks
        </li>
        <li className={activeComponent === 'WorkLogs' ? 'active' : ''} onClick={() => { setActiveComponent('WorkLogs'); setHeading('Work Logs'); }}>
          <FaClipboardList /> Work Logs
        </li>
        <li className={activeComponent === 'Performance' ? 'active' : ''} onClick={() => { setActiveComponent('Performance'); setHeading('Performance'); }}>
          <FaChartLine /> Performance
        </li>
        <li className={activeComponent === 'Settings' ? 'active' : ''} onClick={() => { setActiveComponent('Settings'); setHeading('Settings'); }}>
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
