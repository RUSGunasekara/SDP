import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
      <div className="footer-social">
      <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      
    </div>
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h4>Address</h4>
          <p>
            67, Makola South <br />
            Makola 
          </p>
        </div>
        <div className="footer-section">
          <h4>Reach Out to Us</h4>
          <p>
          <FontAwesomeIcon icon={faPhone} /> +94 77 777 7777 <br />
          <FontAwesomeIcon icon={faEnvelope} />  
            <a href="mailto:udanigunasekara9011@gmail.com" className="social-icon" target="_blank" rel="noopener noreferrer">
          pradeepdrivingschool@gmail.com </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Policy</a>
        </div>
        <div className="apply-now">
          <button className="apply-button">
            <NavLink to="/Registration">Apply Now</NavLink>
            </button>
        </div>
      </div>
      <p className="copyright">
        Copyright © 2025 Pradeep Driving School. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
