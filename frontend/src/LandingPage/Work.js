import React from 'react'
import RegisterLearner from "../Assets/Home_image1.jpg"
import ChooseInstructor from "../Assets/Home_image2.jpg"
import AttendSessions from "../Assets/Teaching.jpg"


const Work = () => {
    const workInfoData = [
      {
        image: RegisterLearner,
        title: "Register as a Learner",
        text: "Create your profile by providing essential details, uploading your ID card, and submitting the payment slip to get started with your driving journey.",
      },
      {
        image: ChooseInstructor,
        title: "Choose Your Instructor",
        text: "Browse through profiles of experienced instructors, check their availability, and select the one that best suits your schedule and preferences.",
      },
      {
        image: AttendSessions,
        title: "Attend Driving Sessions",
        text: "Book your sessions, attend classes with your instructor, and track your progress through our platform. Gain confidence and master driving skills.",
      },
    ];
  
    return (
      <div className="work-section-wrapper">
        <div className="work-section-top">
          <p className="primary-subheading">How It Works</p>
          <h1 className="primary-heading">Steps to Start Driving</h1>
          <p className="primary-text">
            Our process is simple and streamlined to help you focus on learning. Follow these steps to become a confident driver with the best support from our driving school.
          </p>
        </div>
        <div className="work-section-bottom">
          {workInfoData.map((data, index) => (
            <div className="work-section-info" key={index}>
              <div className="info-boxes-img-container">
                <img src={data.image} alt={data.title} />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Work;