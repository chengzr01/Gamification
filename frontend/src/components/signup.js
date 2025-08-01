import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import users, { saveUsers } from '../data/users';
import './login.css';

/**
 * Signup component
 *
 * Provides a very simple account creation flow for demonstration purposes.  A
 * new user enters their ID, name and email.  If the ID is unique the new
 * record is appended to the in‑memory `users` array and the user is logged
 * in via the AuthContext.  In a real application this would involve
 * validating credentials and persisting data to a server.
 */
export default function Signup() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id.trim() || !name.trim() || !email.trim() || !password.trim()) {
      window.alert('Please fill in all fields, including a password.');
      return;
    }
    const exists = users.some((u) => u.id === id.trim());
    if (exists) {
      window.alert('That user ID is already taken. Please choose another.');
      return;
    }
    // Push a bare‑bones user record into the data array.  The new user has
    // no stats yet; these can be added as they play games.
    users.push({
      id: id.trim(),
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      stats: [],
    });
    // Persist the updated users array so the new account survives page reloads
    saveUsers(users);
    login(id.trim());
    navigate('/leaderboard');
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Create Account</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="newId">User&nbsp;ID</label>
        <input
          id="newId"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="choose a unique ID"
          required
        />
        <label htmlFor="newName">Name</label>
        <input
          id="newName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your full name"
          required
        />
        <label htmlFor="newEmail">Email</label>
        <input
          id="newEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
    <label htmlFor="newPassword">Password</label>
    <input
      id="newPassword"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="choose a strong password"
      required
    />
        <button type="submit" className="auth-button">Sign&nbsp;Up</button>
      </form>
      <p className="auth-switch">
        Already have an account?&nbsp;
        <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}