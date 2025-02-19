import React from 'react';
import OwnerSidebar from '../components/OwnerSidebar';
import '../style/OwnerDashboard.css';

function OwnerDashboard() {
  return (
    <div className="dashboard-container">
      <OwnerSidebar />
      <div className="dashboard-content">
        <h1>Welcome to the owner Dashboard</h1>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
}

export default OwnerDashboard
