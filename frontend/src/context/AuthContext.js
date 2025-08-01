import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({ userId: null, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // initialise from localStorage if present
    return localStorage.getItem('userId') || null;
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  const login = (id) => setUserId(id);
  const logout = () => setUserId(null);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;