import React from "react";
import LearnerSidebar from './LearnerSideBar';
import '../Learner/Quiz.css';

const Quiz = () => {
    return (
        <div className="quiz-container">
            <LearnerSidebar />
            <div className="quiz-content">
                <h1>Welcome to the Quiz page</h1>
                {/* Add more quiz content here */}
            </div>
        </div>
    )
}

export default Quiz;