import React from 'react'
import LearnerSidebar from './LearnerSideBar'
import '../Learner/Payment.css'

export default function Payment() {
  return (
    <div className="payment-container">
            <LearnerSidebar />
            <div className="payment-content">
                <h1>Welcome to the payment page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  )
}
