import React from 'react'
import LearnerSidebar from './LearnerSideBar'
import '../Learner/StudyMaterials.css'

function StudyMaterials() {
  return (
    <div className="study-materials-container">
            <LearnerSidebar />
            <div className="study-materials-content">
                <h1>Welcome to the Study materials page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  )
}

export default StudyMaterials;