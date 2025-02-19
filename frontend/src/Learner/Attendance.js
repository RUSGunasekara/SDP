import React from 'react'
import LearnerSidebar from './LearnerSideBar'
import '../Learner/Attendance.css'

export default function Attendance() {
  return (
    <div className="attendance-container">
            <LearnerSidebar />
            <div className="attendance-content">
                <h1>Welcome to the Attendance page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  )
}
