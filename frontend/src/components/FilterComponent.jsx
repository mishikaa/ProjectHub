import React, { useState } from 'react';
import './FilterComponent.css';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    dueDate: '',
    priority: '',
    assignedTo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      dueDate: '',
      priority: '',
      assignedTo: ''
    });
    onFilterChange({});
  };

  return (
    <div className="filter-component">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Status:</label>
          <select name="status" value={filters.status} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="input-group">
          <label>Due Date:</label>
          <input type="date" name="dueDate" value={filters.dueDate} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Priority:</label>
          <select name="priority" value={filters.priority} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="input-group">
          <label>Assigned To:</label>
          <input type="text" name="assignedTo" value={filters.assignedTo} onChange={handleInputChange} />
        </div>
        <button type="submit" className="filter-button">Apply Filters</button>
        <button type="button" className="clear-button" onClick={handleClearFilters}>Clear Filters</button>
      </form>
    </div>
  );
};

export default FilterComponent;
