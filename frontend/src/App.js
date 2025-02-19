import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./LandingPage/Home";
import About from "./LandingPage/About";
import Work from "./LandingPage/Work";
import ServicesCarousel from './LandingPage/Services'; // <-- Changed from Services to ServicesCarousel
import Contact from './LandingPage/Contact';
import Footer from './LandingPage/Footer';
import { Routes, Route, Router } from 'react-router-dom';
import StudentPortal from './Component/StudentPortal';
import LearnerQuiz from './Learner/Quiz';
import Packages from './Component/Packages';
import InformationPortal from './Component/InformationPortal';
import Registration from "./Registration/Registration"; // <-- Add the Registration import
import UserLogin from './Component/UserLogin';
import LearnerDashboard from './Learner/LearnerDashboard'; // Import your Learner Dashboard component
import LearnerAppointment from './Learner/Appointment'; // Import your Learner Dashboard component
import LearnerPayment from './Learner/Payment';
import LearnerAttendance from './Learner/Attendance';
import LearnerStudyMaterials from './Learner/StudyMaterials';
import InstructorDashboard from './Instructor/InstructorDashboard'; // Import your Instructor Dashboard component
import InstructorStudyMaterial from './Instructor/StudyMaterial'
import InstructorQuiz from './Instructor/InstructorQuiz'
import InstructorSessions from './Instructor/Sessions'
import InstructorAttendance from './Instructor/Attendance'
import LearnerHelp from './Learner/LearnerHelp'; // <-- Add the LearnerHelp import
import InstructorHelp from './Instructor/InstructorHelp'; // <-- Add the InstructorHelp import

function App() {
    return (
        <div className="App">
          
            {/* Define the routes */}
            <Routes>
                
                <Route path="/" element={
                    <>
                        <Home/>
                        <Work />
                        <ServicesCarousel /> 
                        <Footer />
                    </>
                } />
                <Route path= '/home' element= {
                        <>
                        <Home/>
                        <Work />
                        <ServicesCarousel /> 
                        <Footer />
                    </>
                } />
                <Route path='/About' element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/student-portal" element={<StudentPortal />} />
                <Route path="/learner-quiz" element={<LearnerQuiz />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/information-portal" element={<InformationPortal />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/registration" element={<Registration />} /> {/* Add the Registration route */}
                <Route path="/learner-dashboard" element={<LearnerDashboard />} />
                <Route path="/learner-appointment" element={<LearnerAppointment />} />
                <Route path="/learner-payment" element={<LearnerPayment />} />
                <Route path="/learner-attendance" element={<LearnerAttendance />} />
                <Route path="/learner-study-materials" element={<LearnerStudyMaterials />} />
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/instructor-study-materials" element={<InstructorStudyMaterial />} />
                <Route path="/instructor-quiz" element={<InstructorQuiz/>} />
                <Route path="/instructor-sessions" element={<InstructorSessions />} />
                <Route path="/instructor-attendance" element={<InstructorAttendance />} />
                <Route path="/learner-help" element={<LearnerHelp />} /> {/* Add the LearnerHelp route */}
                <Route path="/instructor-help" element={<InstructorHelp />} /> {/* Add the InstructorHelp route */}
                
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </div>
    );
};

export default App;