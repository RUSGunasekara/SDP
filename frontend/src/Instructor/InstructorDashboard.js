import React from 'react'
import InstrustorSidebar from './InstructorSidebar'
import './InstructorDashboard.css'
import InstructorProfile from './dashboard/InstructorProfile.js'
import DashboardContent from './dashboard/DashboardContent.js'


function InstructorDashboard() {
  return (
    <div className="dashboard-container">
      <InstrustorSidebar />
      <div className="dashboard-content">
        <DashboardContent/>
        <InstructorProfile/>
      </div>
    </div>
  );
};

export default InstructorDashboard;