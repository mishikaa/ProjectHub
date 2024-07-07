import React, { useEffect, useState } from 'react';
import './CreateProject.css';
import { createProject } from '../../services/projectServices'; // Assuming projectServices handles API calls
import { toast, ToastContainer } from 'react-toastify';

const CreateProject = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    projectType: '',
    startDate: '',
    endDate: '',
    description: '',
    projectRoles: []
  });

  useEffect(() => {
    // Fetch users to populate the project roles dropdown
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/all');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRoles = [...formData.projectRoles];
    updatedRoles[index] = { ...updatedRoles[index], [name]: value };
    setFormData({ ...formData, projectRoles: updatedRoles });
  };

  const addRoleField = () => {
    setFormData({ ...formData, projectRoles: [...formData.projectRoles, { member: '', role: '' }] });
  };

  const removeRoleField = (index) => {
    const updatedRoles = formData.projectRoles.filter((_, i) => i !== index);
    setFormData({ ...formData, projectRoles: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = await createProject(formData);
      toast.success('Project created successfully!');
      // Optionally, you can reset the form or redirect the user after a successful creation
    } catch (error) {
      toast.error('Error creating project');
      console.error('Error creating project', error);
    }
  };

  return (
    <div className='createProject'>
      <ToastContainer />
      <h2 className='heading'>Create Project</h2>
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          {/* Project creation form */}
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
              required
            />
          </div>
          <div className="form-group">
            <label>Project Type</label>
            <input
              type="text"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              placeholder="Enter project type"
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Project Roles</label>
            {formData.projectRoles.map((role, index) => (
              <div key={index} className="role-field">
                <select
                  name="member"
                  value={role.member}
                  onChange={(e) => handleRoleChange(e, index)}
                  required
                >
                  <option value="" disabled>Select Member</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
                <select
                  name="role"
                  value={role.role}
                  onChange={(e) => handleRoleChange(e, index)}
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="PROJECT_MANAGER">Project Manager</option>
                  <option value="TEAM_LEAD">Team Lead</option>
                  <option value="DEVELOPER">Developer</option>
                  <option value="TESTER">Tester</option>
                </select>
                <button type="button" onClick={() => removeRoleField(index)} className="delete-btn">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addRoleField} className="add-role-btn">
              Add Role
            </button>
          </div>
          <div className="form-actions">
            <button type="submit" className="create-btn">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
