import React, { useState } from 'react';
import './createTask.css';

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskType, setTaskType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('Yash Ghori');
  const [priority, setPriority] = useState('High');
  const [taskStatus, setTaskStatus] = useState('Pending');

  const handleCreateTask = () => {
    // Handle task creation logic here
    console.log('Task Created:', { taskTitle, taskType, startDate, endDate, description, assignee, priority, taskStatus });
  };

  const handleDeleteTask = () => {
    // Handle task deletion logic here
    console.log('Task Deleted');
  };

  return (
    <div className="create-task">
      <h2>Tasks / Create Task</h2>
      <div className="task-form">
        <form>
          <div className="form-group">
            <label>Task Title</label>
            <input type="text" placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Task Type</label>
            <input type="text" placeholder="Enter task type" value={taskType} onChange={(e) => setTaskType(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Task Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Task End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Task Description</label>
            <textarea placeholder="Enter task description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label>Assign to</label>
            <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
              <option value="Yash Ghori">Yash Ghori</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <span className="tag high">{priority} <button type="button" onClick={() => setPriority('')}>x</button></span>
          </div>
          <div className="form-group">
            <label>Task Status</label>
            <span className="tag pending">{taskStatus} <button type="button" onClick={() => setTaskStatus('')}>x</button></span>
          </div>
          <div className="form-actions">
            <button type="button" className="create-btn" onClick={handleCreateTask}>Create</button>
            <button type="button" className="delete-btn" onClick={handleDeleteTask}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
