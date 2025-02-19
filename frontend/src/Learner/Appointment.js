import React from 'react'
import LearnerSidebar from './LearnerSideBar'
import '../Learner/Appointment.css'

export default function Appointment() {
  return (
    <div className="appointment-container">
            <LearnerSidebar />
            <div className="appointment-content">
                <h1>Welcome to the Appointment page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  )
}
