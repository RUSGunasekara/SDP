import React from "react";
import { Link } from "react-router-dom";
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaCar, FaClipboardCheck, 
  FaDollarSign, FaBook, FaQuestionCircle, FaCheckCircle, FaSignOutAlt 
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '../style/OwnerSidebar.css';// depending on your file structure

const OwnerSidebar = () => {
  return (
    <div className="sidebar d-flex flex-column bg-dark text-white vh-100 p-3 overflow-auto">
      <br />
      <h2 className="text-center d-none d-md-block">Pradeep Driving School</h2>
      <br />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/owner-dashboard" className="nav-link text-white d-flex align-items-center">
            <FaTachometerAlt className="me-2" /> <span className="d-none d-md-inline">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-learner" className="nav-link text-white d-flex align-items-center">
            <FaUserGraduate className="me-2" /> <span className="d-none d-md-inline">Learner</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-instructor" className="nav-link text-white d-flex align-items-center">
            <FaChalkboardTeacher className="me-2" /> <span className="d-none d-md-inline">Instructor</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-vehicle" className="nav-link text-white d-flex align-items-center">
            <FaCar className="me-2" /> <span className="d-none d-md-inline">Vehicle</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-sessions" className="nav-link text-white d-flex align-items-center">
            <FaClipboardCheck className="me-2" /> <span className="d-none d-md-inline">Sessions</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-payments" className="nav-link text-white d-flex align-items-center">
            <FaDollarSign className="me-2" /> <span className="d-none d-md-inline">Payments</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-study-materials" className="nav-link text-white d-flex align-items-center">
            <FaBook className="me-2" /> <span className="d-none d-md-inline">Study Materials</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-quiz" className="nav-link text-white d-flex align-items-center">
            <FaQuestionCircle className="me-2" /> <span className="d-none d-md-inline">Quiz</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/owner-attendance" className="nav-link text-white d-flex align-items-center">
            <FaCheckCircle className="me-2" /> <span className="d-none d-md-inline">Attendance</span>
          </Link>
        </li>
      </ul>
      <button className="btn btn-danger mt-3 w-100 d-flex align-items-center justify-content-center">
        <FaSignOutAlt className="me-2" /> <span className="d-none d-md-inline">Logout</span>
      </button>
    </div>
  );
};

export default OwnerSidebar;
