import React from 'react'
import LearnerSidebar from '../Learner/LearnerSideBar'
import '../Component/Help.css'

function Help() {
  return (
    <div className="help-container">
            <LearnerSidebar />
            <div className="help-content">
                <h1>Welcome to the help page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
  );
};

export default Help;