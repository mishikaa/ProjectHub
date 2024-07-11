import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './TotalWorkDone.css';

const data = {
  datasets: [
    {
      data: [5, 2],
      backgroundColor: ['#36A2EB', '#FFCE56']
    }
  ],
  labels: ['Completed', 'Remaining']
};

const TotalWorkDone = () => {
  return (
    <div className="total-work-done">
      <h2>Total work done</h2>
      <Doughnut data={data} />
      <p>5w: 2d</p>
    </div>
  );
};

export default TotalWorkDone;
