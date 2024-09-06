import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import AdminPage from './AdminPage';

const MainAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const predefinedUsername = 'admin';
  const predefinedPassword = 'admin123';

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    if (username === predefinedUsername && password === predefinedPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      {isAuthenticated ? <AdminPage /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default MainAdmin;
