import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Routes and Link
import Login from './Login';
import SkillSeekerDashboard from './SkillSeekerDashboard';
import SkillProvider from './SkillProvider';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        
        <Routes>
          {/* Route for the landing page */}
          <Route
            path="/"
            element={
              !loggedIn ? (
                <div>
                  <h2>Welcome to SkillSwap Hub</h2>
                  <p>Choose your login type:</p>
                  <div>
                    <Link to="/login/seeker">Login as Seeker</Link>
                  </div>
                  <div>
                    <Link to="/login/provider">Login as Provider</Link>
                  </div>
                </div>
              ) : (
                <SkillSeekerDashboard />
              )
            }
          />
          {/* Route for logging in as a seeker */}
          <Route path="/login/seeker" element={<Login onLogin={handleLogin} />} />
          {/* Route for logging in as a provider */}
          <Route path="/login/provider" element={<Login onLogin={handleLogin} />} />
          {/* Route for the seeker dashboard */}
          <Route path="/dashboard" element={<SkillSeekerDashboard />} />
          {/* Route for the provider dashboard */}
          <Route path="/skillprovider" element={<SkillProvider />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
