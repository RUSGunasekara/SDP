import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaUsers, FaFileInvoice, FaBook, FaQuestionCircle, FaCalendarCheck, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import './LearnerSideBar.css';

const Sidebar = () => {
  return (
    
    <div className="sidebar d-flex flex-column bg-dark text-white vh-100 p-3 overflow-auto">
      <br/> 
      <h2 className="text-center d-none d-md-block">Pradeep Driving School</h2> <br/>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/learner-dashboard" className="nav-link text-white d-flex align-items-center">
            <FaBox className="me-2" /> <span className="d-none d-md-inline">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learner-study-materials" className="nav-link text-white d-flex align-items-center">
            <FaBook className="me-2" /> <span className="d-none d-md-inline">Study Materials</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learner-quiz" className="nav-link text-white d-flex align-items-center">
            <FaQuestionCircle className="me-2" /> <span className="d-none d-md-inline">Quiz</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learner-appointment" className="nav-link text-white d-flex align-items-center">
            <FaCalendarCheck className="me-2" /> <span className="d-none d-md-inline">Appointments</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learner-payment" className="nav-link text-white d-flex align-items-center">
            <FaFileInvoice className="me-2" /> <span className="d-none d-md-inline">Payment</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learner-attendance" className="nav-link text-white d-flex align-items-center">
            <FaUsers className="me-2" /> <span className="d-none d-md-inline">Attendance</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/learner-help" className="nav-link text-white d-flex align-items-center">
            <FaInfoCircle className="me-2" /> <span className="d-none d-md-inline">Help</span>
          </Link>
        </li>
      </ul>
      <button className="btn btn-danger mt-3 w-100 d-flex align-items-center justify-content-center">
        <FaSignOutAlt className="me-2" /> <span className="d-none d-md-inline">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
