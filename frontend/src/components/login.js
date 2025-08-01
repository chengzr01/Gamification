import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import users from '../data/users';
import './login.css';

/**
 * Login component
 *
 * Allows an existing user to log into the application by entering their user ID.
 * In a production system this would be replaced with proper authentication,
 * but for this demo we simply check the ID against the local user list.  On
 * success the user identifier is stored in the AuthContext and the
 * application navigates back to the leaderboard.
 */
export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.id === userId.trim());
    if (!user) {
      window.alert('User not found. Please check your ID or create a new account.');
      return;
    }
    if (user.password !== password.trim()) {
      window.alert('Incorrect password. Please try again.');
      return;
    }
    login(user.id);
    navigate('/leaderboard');
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="userId">User&nbsp;ID</label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g. alice"
          required
        />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="your password"
        required
      />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-switch">
        Don&apos;t have an account?&nbsp;
        <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
}