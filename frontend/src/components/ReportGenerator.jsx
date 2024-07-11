import React, { useState } from 'react';
import './ReportGenerator.css'; // Import the CSS file

const ReportGenerator = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });
  const [criteria, setCriteria] = useState('completionRate'); // Default criteria
  const [format, setFormat] = useState('pdf');

  const handleGenerateReport = async () => {
    const response = await fetch(`/api/reports/${format}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filters, criteria })
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project_report.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error('Failed to generate report');
    }
  };

  return (
    <div className="report-generator">
      <h2 className="title">Generate Report</h2>
      <div className="input-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label>End Date:</label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label>Status:</label>
        <input
          type="text"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label>Criteria:</label>
        <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
          <option value="completionRate">Completion Rate</option>
          {/* Add more criteria options here if needed */}
        </select>
      </div>
      <div className="input-group">
        <label>Format:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
        </select>
      </div>
      <button className="generate-button" onClick={handleGenerateReport}>Generate Report</button>
    </div>
  );
};

export default ReportGenerator;
