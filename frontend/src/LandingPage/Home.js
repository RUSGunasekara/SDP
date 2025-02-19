import React from 'react';
import Navbar from "./Navbar";
import BannerImage from "../Assets/home_image3.jpg";
// Removed the BackgroundImage import since we’re using a CSS gradient for the background.
import "./Home.css";
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">Drive With Confidence, Learn With Us!</h1>
          <p className="primary-text">
            Join the #1 Government Approved Driving School in Makola!
            Register now and start your driving journey with expert instructors.
          </p>
          <button className="secondary-button">
            <NavLink to="/Registration">Register Online Now</NavLink>
          </button>
        </div>
        <div className="home-image-container">
          <img src={BannerImage} alt="Driving School Banner" />
        </div>
      </div>

      {/* Section: Divided into 4 columns */}
      <div className="footer-container">
        <div className="footer-item">
          <p>
            Rated <strong>Excellent</strong> on <span className="google-color">Google</span> <br/>⭐⭐⭐⭐⭐
          </p>
        </div>
        <div className="footer-item">
          <p>The #1 Government Approved Driving School In Makola</p>
        </div>
        <div className="footer-item">
          <p>Our Team is Friendly &amp; Supportive</p>
        </div>
        <div className="footer-item">
          <p>35 Years of Experience</p>
        </div>
      </div>
    </div>
  );
}

export default Home;