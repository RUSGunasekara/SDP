import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentPortalImage from "../Assets/Home_image1.jpg"; // Corrected to match the specified path
import QuizImage from "../Assets/Home_image2.jpg"; // Adjusted path
import BookingImage from "../Assets/Reverse.jpg"; // Adjust path if necessary
import PackagesImage from "../Assets/Home_image2.jpg"; // Adjust path if necessary
import InformationPortalImage from "../Assets/Home_image2.jpg"; // Adjust path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const servicesData = [
    {
      image: StudentPortalImage, // Ensure this file exists in Assets folder
      title: "Student Portal",
      text: "Access your learning materials, track progress, and communicate with your instructor, all from one centralized portal.",
      link: "/student-portal",
    },
    {
      image: QuizImage,
      title: "Quiz",
      text: "Take quizzes to test your knowledge and improve your skills. Get feedback and track your performance over time.",
      link: "/quiz",
    },
    {
      image: BookingImage,
      title: "Session Booking",
      text: "Easily book your driving lessons and manage your schedule with our user-friendly booking system.",
      link: "/booking",
    },
    {
      image: PackagesImage,
      title: "Our Packages",
      text: "Explore our flexible packages tailored to your needs. Choose the one that fits your learning pace and budget.",
      link: "/packages",
    },
    {
      image: InformationPortalImage,
      title: "Information Portal",
      text: "Stay updated with important driving-related information, rules, and regulations through our information portal.",
      link: "/information-portal",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % servicesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + servicesData.length) % servicesData.length
    );
  };

  const handleServiceClick = (link) => {
    navigate(link);
  };

  return (
    <div className="services-carousel-wrapper">
      <div className="services-carousel-top">
        <p className="primary-subheading">Our Services</p>
        <h1 className="primary-heading">What We Offer</h1>
        <p className="primary-text">
          Our driving school provides a comprehensive range of services to help you succeed. Explore the options and start your journey today!
        </p>
      </div>
      <div className="services-carousel">
        <button onClick={prevSlide} className="carousel-arrow left">
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </button>
        <div
          className="services-carousel-item"
          onClick={() => handleServiceClick(servicesData[currentIndex].link)}
        >
          <div className="info-boxes-img-container">
            <img src={servicesData[currentIndex].image} alt={servicesData[currentIndex].title} />
          </div>
          <h2>{servicesData[currentIndex].title}</h2>
          <p>{servicesData[currentIndex].text}</p>
        </div>
        <button onClick={nextSlide} className="carousel-arrow right">
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </div>
    </div>
  );
};

export default ServicesCarousel;
