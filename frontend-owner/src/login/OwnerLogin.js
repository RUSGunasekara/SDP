import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import LoginPageImage from "../assets/home_image4.jpg"; // Side image
import CompanyLogo from "../assets/driving-school-logo.png"; // Company logo
import "./OwnerLogin.css"; // Import CSS styles
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

function OwnerLogin() {
  const [userType, setUserType] = useState("owner"); // Set owner as default role
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For Owner
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Hardcoded users for testing (remove later)
  const hardcodedUsers = [
    { username: "owner@example.com", password: "ownerpass", role: "owner" },
  ];

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const user = hardcodedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      setError("Invalid credentials. Please check your username and password.");
      return;
    }

    if (user.role !== userType) {
      setError("Role does not match.");
      return;
    }

    alert("Login Successful!");
    console.log("User Data:", user);
    navigate("/owner-dashboard");
  };

  return (
    <Container className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card shadow-lg rounded-4 d-flex">
        {/* Left Section */}
        <div className="login-form-container d-flex flex-column justify-content-center p-5">
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src={CompanyLogo}
              alt="Company Logo"
              className="company-logo mb-3"
            />
          </div>

          {/* Owner Login Form */}
          {userType === "owner" && (
            <>
              <h4 className="form-title text-center mb-4">Welcome!</h4>
              <Form>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    label={<span style={{ color: "#6c63ff" }}>Remember me</span>}
                  />
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <Button
                  variant="primary"
                  className="login-btn w-100 mb-3"
                  onClick={handleLogin}
                >
                  Log In
                </Button>

                {/* Sign Up Link */}
                <div className="text-center">
                  Don't have an account? <a href="/registration">Sign Up</a>
                </div>
              </Form>
            </>
          )}
        </div>

        {/* Right Section - Image */}
        <div className="login-image-container d-none d-md-block">
          <img
            src={LoginPageImage}
            alt="Login Illustration"
            className="login-image"
          />
        </div>
      </div>
    </Container>
  );
}

export default OwnerLogin;
