import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useLogin from '../hooks/login'; // adjust the import path if needed
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useLogin(); // using the proper login hook

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!mobile.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(mobile, password); // pass mobile/password to the query
      onLoginSuccess(); // go to dashboard or whatever you want
      navigate('/');
    } catch (err) {
      // error is already handled by the hook (toast etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please login to your account</p>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={styles.input}
          autoFocus
          inputMode="tel"
          maxLength={15}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleLogin}
          style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw', // <--- ADD THIS LINE
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    margin: 0,
  },

  card: {
    width: '420px',
    backgroundColor: '#fff',
    padding: '50px 40px 40px',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '4px',
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    textAlign: 'center',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '14px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.07)',
  },
  button: {
    padding: '14px',
    fontSize: '18px',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(101, 72, 255, 0.4)',
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
    userSelect: 'none',
  },
  buttonLoading: {
    background: '#999',
    cursor: 'not-allowed',
    boxShadow: 'none',
    transform: 'none',
  },
};

export default Login;
