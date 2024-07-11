import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, createTask, updateTask, deleteTask, updateProject, deleteProject, uploadFile, deleteFile } from '../../services/projectServices'; // Import deleteFile function
import './projectPage.css';
import TaskCard from '../Task/TaskCard';
import Navbar from '../Dashboard/Navbar';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [taskFormData, setTaskFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    assignedTo: '',
    projectId: id
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
        setTasks(projectData.tasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project details', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(taskFormData);
      setTasks([...tasks, newTask]);
      setTaskFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Not Started',
        assignedTo: '',
        projectId: id
      });
      setShowTaskForm(false); // Hide the form after creating a task
      toast.success('Task created successfully'); // Toast notification
    } catch (error) {
      console.error('Error adding task', error);
      toast.error('Failed to create task'); // Toast notification on error
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const updated = await updateTask(taskId, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? updated : task)));
      toast.success('Task updated successfully'); // Toast notification
    } catch (error) {
      console.error('Error updating task', error);
      toast.error('Failed to update task'); // Toast notification on error
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully'); // Toast notification
    } catch (error) {
      console.error('Error deleting task', error);
      toast.error('Failed to delete task'); // Toast notification on error
    }
  };

  const handleUpdateProjectStatus = async (newStatus) => {
    try {
      const updatedProject = await updateProject(id, { status: newStatus });
      setProject(updatedProject);
      toast.success(`Project status updated to ${newStatus}`); // Toast notification
    } catch (error) {
      console.error('Error updating project status', error);
      toast.error('Failed to update project status'); // Toast notification on error
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id);
      // Redirect to project list or homepage after successful deletion
      toast.success('Project deleted successfully'); // Toast notification
    } catch (error) {
      console.error('Error deleting project', error);
      toast.error('Failed to delete project'); // Toast notification on error
    }
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData({ ...taskFormData, [name]: value });
  };

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const onDrop = (acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    setFiles(acceptedFiles);
  };

  const handleFileUpload = async () => {
    console.log('Files to upload:', files);
    if (files.length === 0) {
      toast.error('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await uploadFile(id, formData);
      setProject({ ...project, attachments: [...project.attachments, response.data.location] });
      toast.success('File uploaded successfully');
      setFiles([]);
    } catch (error) {
      console.error('Error uploading file', error);
      toast.error('Failed to upload file');
    }
  };

  const handleFileDelete = async (fileUrl) => {
    try {
      await deleteFile(id, fileUrl); // Implement deleteFile function in projectServices
      const updatedAttachments = project.attachments.filter((file) => file !== fileUrl);
      setProject({ ...project, attachments: updatedAttachments });
      toast.success('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file', error);
      toast.error('Failed to delete file');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      {user ? (
        <Navbar user={user} />
      ) : (
        <div>Loading...</div>
      )}
      <div className="project-page">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <h2 className="heading">{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not specified'}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Project Type:</strong> {project.projectType}</p>
            <h3>Project Roles:</h3>
            <ul>
              {project.projectRoles.map((role, index) => (
                <li key={index}>
                  <span className="">
                    <img src={role.member.image} alt={`${role.member.displayName}`} className="team-avatar" />
                    <span className='member-name'>{`${role.member.displayName}`}</span>
                  </span> - {role.role.toLowerCase()}
                </li>
              ))}
            </ul>
            <div className="task-list">
              <h3>Tasks:</h3>
              {tasks.map((task) => {
                const assignedUser = project.projectRoles.find((role) => role.member._id === task.assignedTo);
                return (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    user={user}
                    assignedUser={assignedUser ? assignedUser.member : null}
                  />
                );
              })}
            </div>
            {(user.role === 'ADMIN' || user.role === 'PROJECT_MANAGER') && (
              <>
                <button onClick={toggleTaskForm} className={`create-task-btn ${showTaskForm ? 'cancel-btn' : ''}`}>
                  {showTaskForm ? 'Cancel' : 'Create Task'}
                </button>
                {showTaskForm && (
                  <form onSubmit={handleAddTask} className="task-form">
                    <h3>Create Task</h3>
                    <div className="form-group">
                      <label>Task Name</label>
                      <input
                        type="text"
                        name="name"
                        value={taskFormData.name}
                        onChange={handleTaskInputChange}
                        placeholder="Enter task name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Task Description</label>
                      <textarea
                        name="description"
                        value={taskFormData.description}
                        onChange={handleTaskInputChange}
                        placeholder="Enter task description"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={taskFormData.startDate}
                        onChange={handleTaskInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={taskFormData.endDate}
                        onChange={handleTaskInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={taskFormData.status}
                        onChange={handleTaskInputChange}
                        required
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Assign To</label>
                      <select
                        name="assignedTo"
                        value={taskFormData.assignedTo}
                        onChange={handleTaskInputChange}
                      >
                        <option value="" disabled>Select Assignee</option>
                        {project.projectRoles.map((role, index) => (
                          <option key={index} value={role.member._id}>
                            {role.member.firstName} {role.member.lastName} - {role.role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="create-btn">Create Task</button>
                    </div>
                  </form>
                )}
              </>
            )}
            <div className="file-upload-section">
              <h3>File Upload</h3>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <button onClick={handleFileUpload} className="upload-btn">Upload File</button>
              <ul>
                {project.attachments && project.attachments.map((file, index) => (
                  <li key={index}>
                    <a href={file} target="_blank" rel="noopener noreferrer">{file.split('/').pop()}</a>
                    <button onClick={() => handleFileDelete(file)}>Delete</button> {/* Add delete functionality */}
                  </li>
                ))}
              </ul>
            </div>
            {(user.role === 'ADMIN' || user.role === 'PROJECT_MANAGER') && (
              <div className="project-actions">
                <h3>Project Management</h3>
                <button onClick={() => handleUpdateProjectStatus('In Progress')} className="update-status-btn">
                  Mark as In Progress
                </button>
                <button onClick={() => handleUpdateProjectStatus('Completed')} className="update-status-btn">
                  Mark as Completed
                </button>
                <button onClick={handleDeleteProject} className="delete-project-btn">
                  Delete Project
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProjectPage;
