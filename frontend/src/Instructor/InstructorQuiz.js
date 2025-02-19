import React from 'react'
import './InstructorQuiz.css'
import InstructorSidebar from './InstructorSidebar'

function InstructorQuiz() {
  return (
    <div className="quiz-container">
            <InstructorSidebar />
            <div className="quiz-content">
                <h1>Welcome to the Quiz page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  )
}

export default InstructorQuiz