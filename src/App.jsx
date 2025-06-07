import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth_token'));

  useEffect(() => {
    // Optional: keep in sync if token changes in another tab
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('auth_token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      <Routes>
        {/* <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          }
        /> */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/*"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
