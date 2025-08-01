import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import Layout from './components/layout.js';
import Leaderboard from './components/leaderboard.js';
import Profile from './components/profile.js';
import CaseSelection from './components/caseSelection.js';
import CreateCase from './components/createCase.js';
import Game from './components/Game.js';
import Login from './components/login.js';
import Signup from './components/signup.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Redirect root to leaderboard */}
            <Route path="/" element={<Navigate to="/leaderboard" />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/cases" element={<CaseSelection />} />
            <Route path="/create-case" element={<CreateCase />} />
            <Route path="/game/:caseId" element={<Game />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/play" element={<Navigate to="/cases" />} />
            {/* Catch‑all fallback */}
            <Route path="*" element={<div style={{ padding: '1rem' }}>404 – Page not found</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;