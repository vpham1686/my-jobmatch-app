import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from "./components/WelcomeScreen.js";
import JobSeekerDashboard from "./components/JobSeekerDashboard.js";
import RecruiterDashboard from "./components/RecruiterDashboard.js";
import HomePage from "./components/HomePage.js"; // import the HomePage component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/jobseeker" element={<JobSeekerDashboard />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/home" element={<HomePage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
