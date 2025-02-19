import React from 'react'
import Navbar from "./Navbar";
import Footer from './Footer';

import AboutBackgroundImage from "../Assets/Practice.jpg";
//import { BsFillPlayCircleFill } from 'react-icons/bs';

const About = () => {
  return (
    <div className ="about-page-wrapper">
    <Navbar/>
    <div className="about-section-container">
     
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="about" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About Us</p>
        <h1 className="primary-heading">
          Empowering Confident Drivers, One Lesson at a Time
        </h1>
        <p className="primary-text">
          At our driving school, we are dedicated to helping individuals build the skills, 
          knowledge, and confidence they need to navigate the roads safely and responsibly. With 
          years of experience and a team of highly trained instructors, we offer 
          personalized driving lessons tailored to meet the unique needs of every learner.
        </p>
        <p className="primary-text">
          From theory to practice, we ensure our learners are well-prepared for every aspect
          of driving. Whether you're a first-time driver or looking to refine your skills, we 
          provide a supportive and professional environment to help you succeed.
        </p>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;