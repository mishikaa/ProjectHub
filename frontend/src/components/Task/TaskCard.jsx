import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './taskCard.css';
import { toast } from 'react-toastify';

const TaskCard = ({ task, onUpdate, onDelete, user, assignedUser }) => {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const isProjectManager = user && user.role === 'PROJECT_MANAGER';
  const isAssignedUser = user && user._id === task.assignedTo;

  const handleEdit = () => {
    setEditing(true);
    setEditedTask({ ...task });
  };

  const handleSave = async () => {
    try {
      await onUpdate(editedTask._id, editedTask);
      setEditing(false);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task', error);
      toast.error('Error updating task');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task._id);
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task', error);
      toast.error('Error deleting task');
    }
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const updatedTask = { ...task, status: newStatus };

    try {
      await onUpdate(task._id, updatedTask);
      setEditedTask(updatedTask);
      toast.info(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status', error);
      toast.error('Error updating status');
    }
  };

  const calculateDeadline = () => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const today = new Date();
    const diffTime = Math.abs(endDate - startDate);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const remainingTime = endDate - today;
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    
    return { totalDays, remainingDays };
  };

  const deadline = calculateDeadline();

  return (
    <div className={`task-card ${deadline.remainingDays <= 3 ? 'urgent' : ''}`}>
      {editing ? (
        <div className="task-edit">
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            placeholder="Task Name"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Task Description"
          ></textarea>
          <div className="task-actions">
            <select
              name="status"
              value={editedTask.status}
              onChange={handleChange}
              disabled={!isAssignedUser}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {isAssignedUser && (
              <>
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="task-details">
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>
            <strong>Deadline:</strong> {deadline.totalDays} days
            {deadline.remainingDays <= 3 && (
              <span className="urgent-text"> ({deadline.remainingDays} days remaining)</span>
            )}
          </p>
          <p><strong>Status:</strong> {task.status}</p>
          {assignedUser && (
            <p><strong>Assigned To:</strong> {assignedUser.firstName} {assignedUser.lastName}</p>
          )}
          <div className="task-actions">
            {isAssignedUser && (
              <div className="status-update">
                <label htmlFor="status">Update Status:</label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleStatusChange}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
            {isProjectManager && (
              <>
                <button className="edit-btn" onClick={handleEdit}>Edit</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.object, // Assuming user object is passed to determine roles
  assignedUser: PropTypes.object, // Assuming assignedUser object is passed to get assigned user's details
};

export default TaskCard;
