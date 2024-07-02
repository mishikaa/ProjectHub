import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Performance.css';

const Performance = () => {
  const lineData = {
    labels: ['Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022'],
    datasets: [
      {
        label: 'Achieved',
        data: [4, 6, 5, 7, 6, 5],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Target',
        data: [5, 6, 6, 6, 7, 7],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const pieData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="performance">
      <div className="performance-report">
        <h2>Performance Report</h2>
        <Line data={lineData} />
      </div>
      <div className="work-log">
        <h2>Work Log</h2>
        <Doughnut data={pieData} />
      </div>
    </div>
  );
};

export default Performance;
