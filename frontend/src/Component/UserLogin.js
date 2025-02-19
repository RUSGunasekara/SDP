import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import LoginPageImage from "../Assets/Practice.jpg"; // Side image
import CompanyLogo from "../Assets/driving-school-logo.png"; // Company logo
import "./UserLogin.css"; // Import CSS styles
import axios from "axios"; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


function UserLogin() {
  const [userType, setUserType] = useState(""); // To track selection
  const [password, setPassword] = useState("");
  const [instructorId, setInstructorId] = useState(""); // For Instructor
  const [username, setUsername] = useState(""); // For Instructor
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

 /* const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        userType,
        username,
        password,
        instructorId: userType === "instructor" ? instructorId : null,
      });

      if (response.data.success) {
        // Store token in localStorage or cookies
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");
        console.log("User Data:", response.data.user);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
    setIsLoading(false);
  }; */

  // Hardcoded users for testing (remove later)
  const hardcodedUsers = [
    { username: 'learner1@example.com', password: 'learnerpass', role: 'learner' },
    { instructorId: 1, username: 'instructor1@example.com', password: 'instructorpass', role: 'instructor' },
  ];

  const handleLogin = async () => {
    const user = hardcodedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (user.role === userType) {
        alert('Login Successful!');
        console.log('User Data:', user);

        // Redirect to Learner Dashboard (if user is a learner)
        if (user.role === 'learner') {
          navigate('/learner-dashboard');
        }
        else if (user.role === 'instructor') {
          navigate('/instructor-dashboard');
        }
        // Add redirection for other roles like instructor if needed
      } else {
        setError('Role does not match');
      }
    } else {
      setError('Invalid credentials. Please check your username and password.');
    }
  }; 

  


  return (
    <Container className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg rounded-4 d-flex">
        {/* Left Section */}
        <div className="login-form-container d-flex flex-column justify-content-center p-5">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src={CompanyLogo} alt="Company Logo" className="company-logo mb-3" />
          </div>

          {/* User Type Selection */}
          {!userType && (
            <div className="user-selection">
              <h4 className="form-title text-center mb-3">Select Your Role</h4>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="primary" onClick={() => setUserType("learner")}>
                  Learner
                </Button>
                <Button variant="secondary" onClick={() => setUserType("instructor")}>
                  Instructor
                </Button>
              </div>
            </div>
          )}

          {/* Learner Login Form */}
          {userType === "learner" && (
            <>
              <h4 className="form-title text-center mb-4">Welcome!</h4>
              <Form>
                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter your username" 
                  onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" 
                  onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" label={<span style={{ color: "#6c63ff" }}>Remember me</span>} />
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                {/* Login Button */}
                <Button variant="primary" className="login-btn w-100 mb-3" onClick={handleLogin}>
                  Log In
                </Button>

                {/* Sign Up Link (Only for Learners) */}
                <div className="text-center">
                  Don't have an account? <a href="/registration">Sign Up</a>
                </div>
              </Form>
            </>
          )}

          {/* Instructor Login Form */}
          {userType === "instructor" && (
            <>
              <h4 className="form-title text-center mb-4">Welcome Instructor!</h4>
              <Form>
                {/* Instructor ID */}
                <Form.Group className="mb-3">
                  <Form.Label>Instructor ID</Form.Label>
                  <Form.Control type="text" placeholder="Enter Instructor ID" 
                  onChange={(e) => setInstructorId(e.target.value)} />
                </Form.Group>

                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter Username" 
                  onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" 
                  onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" label={<span style={{ color: "#6c63ff" }}>Remember me</span>} />
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                {/* Login Button */}
                <Button variant="primary" className="login-btn w-100" onClick={handleLogin}  disabled={isLoading} >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
                  {error && <div className="text-danger mt-3">{error}</div>}
              </Form>
            </>
          )}
        </div>

        {/* Right Section - Image */}
        <div className="login-image-container d-none d-md-block">
          <img src={LoginPageImage} alt="Login Illustration" className="login-image" />
        </div>
      </div>
    </Container>
  );
}

export default UserLogin;
