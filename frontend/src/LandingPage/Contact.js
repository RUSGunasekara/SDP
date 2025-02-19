import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      
      <Container className="mt-4">
        {/* Contact Information Section */}
        <Card className="text-white p-4 mb-4" style={{ backgroundColor: '#2c4b61' }}>
          <Card.Body>
            {/*<Row>
              <Col md={8}> */}
                <h2>Contact Information</h2>
                <p>
                  Welcome to our Contact Us page! We value your feedback, questions, and suggestions, and we
                  are always here to assist you in any way we can. Please feel free to reach out to us using the
                  contact information provided below, and we will get back to you as soon as possible. Thank you
                  for your interest in our company, and we look forward to hearing from you!
                </p>
            {/*  </Col>*/}
              {/* <Col md={4} className="text-center">
                Contact Illustration Image 
                <img src= alt="Contact Us" className="img-fluid" />
              </Col> 
            </Row>*/}
          </Card.Body>
        </Card>

        <Row>
          {/* Google Map Section */}
          <Col md={6}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d257.5814997869365!2d79.9408269935691!3d6.976739525974287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257042b0f2313%3A0xc38fe8da3f839236!2sPradeep%20Learners!5e0!3m2!1sen!2sus!4v1739382753953!5m2!1sen!2sus" 
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            
          </Col>

          <br/>
          {/* Contact Details Section */}
          <Col md={6}>
            <ul className="list-unstyled">
              <li className="mb-3">
                <FaMapMarkerAlt className="text-danger me-2"/> 
                <strong>Address:</strong>  67, Makola South <br />
                Makola 
              </li>
              <li className="mb-3">
                <FaEnvelope className="text-warning me-2"/> 
                <strong>Email Address:</strong> info@pradeepdrivingschool.lk
              </li>
              <li className="mb-3">
                <FaPhone className="text-success me-2"/> 
                <strong>Phone:</strong> 077 777 7777
              </li>
              <li>
                <FaIdCard className="text-primary me-2"/> 
                <strong>Registration Number:</strong> DS-60


              </li>
            </ul>
          </Col>
        </Row>
  
        <br/>
        <br/>
      </Container>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default Contact;
