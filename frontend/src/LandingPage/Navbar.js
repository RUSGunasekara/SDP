import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaHome, FaInfoCircle, FaPhone, FaUser, FaUserPlus } from "react-icons/fa";
import Logo from "../Assets/Logo(1).png"; 

function NavigationBar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <Navbar expand="lg" bg="white" className="shadow-sm px-3 rounded">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="Logo" style={{ height: "60px" }} />
          </Navbar.Brand>

          {/* Collapsible Button for Small Screens */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setShowSidebar(true)}
          >
            <HiOutlineBars3 size={30} />
          </Navbar.Toggle>

          {/* Regular Nav Links for Large Screens */}
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
            <Nav className="ms-auto navbar-custom">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Nav.Link as={Link} to="/user-login">Login</Nav.Link>
                <Nav.Link as={Link} to="/registration" className="register-btn">Register</Nav.Link>
            </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* Sidebar for Small Screens */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/home" onClick={() => setShowSidebar(false)}>
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setShowSidebar(false)}>
              <FaInfoCircle /> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setShowSidebar(false)}>
              <FaPhone /> Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/user-login" onClick={() => setShowSidebar(false)}>
              <FaUser /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/registration" className="btn btn-primary text-black" onClick={() => setShowSidebar(false)}>
              <FaUserPlus /> Register
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar;
