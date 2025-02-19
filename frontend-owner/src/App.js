import './App.css';
import { Routes, Route } from 'react-router-dom';
import OwnerLogin from './login/OwnerLogin';
import OwnerDashboard from './components/OwnerDashboard';
import Attendance from './components/Attendance';
import Instructor from './components/Instructor';
import Learner from './components/Learner';
import Payments from './components/Payment';
import Quiz from './components/Quiz';
import Sessions from './components/Session';
import StudyMaterials from './components/StudyMaterials';
import Vehicle from './components/Vehicle';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<OwnerLogin />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard/>} />
          <Route path="/owner-attendance" element={<Attendance />} />
          <Route path="/owner-instructor" element={<Instructor />} />
          <Route path="/owner-learner" element={<Learner />} />
          <Route path="/owner-payments" element={<Payments />} />
          <Route path="/owner-quiz" element={<Quiz />} />
          <Route path="/owner-sessions" element={<Sessions />} />
          <Route path="/owner-study-materials" element={<StudyMaterials />} />
          <Route path="/owner-vehicle" element={<Vehicle />} />
        </Routes>
      </div>
   
  );
}

export default App;
