import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import './Performance.css';

const Performance = () => {
  const [lineData, setLineData] = useState({});
  const [pieData, setPieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [projectStatus, setProjectStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const fetchData = async () => {
    try {
      const projectProgressResponse = await axios.get('/api/performance/project-progress', {
        params: { status: projectStatus, sort: sortBy }
      });
      const taskCompletionRatesResponse = await axios.get('/api/performance/task-completion-rates');

      const lineChartData = {
        labels: projectProgressResponse.data.map(project => project.projectTitle),
        datasets: [
          {
            label: 'Project Progress (%)',
            data: projectProgressResponse.data.map(project => project.progress),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
        ],
      };

      const pieChartData = {
        labels: Object.keys(taskCompletionRatesResponse.data),
        datasets: [
          {
            data: Object.values(taskCompletionRatesResponse.data),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          },
        ],
      };

      setLineData(lineChartData);
      setPieData(pieChartData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
      setLoading(false); // Ensure loading state is handled even on error
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectStatus, sortBy]); // Update data when filters change

  const handleFilterChange = (e) => {
    setProjectStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleApplyFilters = () => {
    setLoading(true);
    fetchData();
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Display a loading indicator while fetching data
  }

  return (
    <div className="performance">
      <div className="filters">
        <select id="filter-project-status" onChange={handleFilterChange} value={projectStatus}>
          <option value="all">All Projects</option>
          <option value="Not Started">Not started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select id="sort-by" onChange={handleSortChange} value={sortBy}>
          <option value="date">Date</option>
          {/* <option value="priority">Priority</option> */}
          <option value="status">Status</option>
        </select>
        <button id="apply-filters" onClick={handleApplyFilters}>Apply Filters</button>
      </div>
      <div className="performance-report">
        <h2 className='heading'>Project Progress</h2>
        <Line data={lineData} />
      </div>
      <div className="work-log">
        <h2 className='heading'>Task Completion Rates</h2>
        <Doughnut data={pieData} />
      </div>
    </div>
  );
};

export default Performance;
