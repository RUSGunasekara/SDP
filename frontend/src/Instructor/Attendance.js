import React from 'react'
import InstructorSidebar from './InstructorSidebar'
import './Attendance.css'

function Attendance() {
  return (
    <div className="attendance-container">
    <InstructorSidebar />
    <div className="attendance-content">
        <h1>Welcome to the Attendance page</h1>
        {/* Add more quiz content here */}
    </div>
</div>
  )
}

export default Attendance