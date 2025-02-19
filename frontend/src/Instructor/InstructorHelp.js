import React from 'react'
import InstructorSidebar from '../Instructor/InstructorSidebar'
import '../Component/Help.css'

function Help() {
  return (
    <div className="help-container">
            <InstructorSidebar />
            <div className="help-content">
                <h1>Welcome to the help page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  )
}

export default Help