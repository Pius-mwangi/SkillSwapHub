import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './Login';
import SkillSeekerDashboard from './SkillSeekerDashboard';
import SkillProvider from './SkillProvider'; // Import SkillProvider component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <h1>SkillSwap Hub</h1>
        <Routes> {/* Use <Routes> to define your routes */}
          <Route path="/dashboard" element={<SkillSeekerDashboard />} />
          <Route path="/" element={!loggedIn ? <Login onLogin={handleLogin} /> : <SkillSeekerDashboard />} />
          <Route path="/skillprovider" element={<SkillProvider />} /> {/* Add a route for SkillProvider */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
