import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Dashboard from './components/dashboard/Dashboard';
import UpdateUserDialog from './components/users/UpdateUserDialog'; // new

function App() {
  const isLoggedIn = !!localStorage.getItem('auth_token');

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isLoggedIn ? (
          <>
            <Route path="/*" element={<Dashboard />} />
            {/* <Route path="/users/:id/edit" element={<UpdateUserDialog />} /> */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
