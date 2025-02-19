import React from 'react';
import LearnerSidebar from './LearnerSideBar';
import './LearnerDashboard.css';

function LearnerDashboard() {
  return (
    <div className="dashboard-container">
      <LearnerSidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Learner Dashboard</h1>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
}

export default LearnerDashboard
