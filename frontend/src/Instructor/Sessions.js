import React from 'react'
import InstructorSidebar from './InstructorSidebar'
import './Sessions.css'

function Sessions() {
  return (
    <div className="sessions-container">
      <InstructorSidebar />
        <div className="sessions-content">
          <h1>Welcome to the Sessions page</h1>
          {/* Add more quiz content here */}
        </div>
    </div>
  )
}

export default Sessions