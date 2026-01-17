import { useState, useContext } from 'react';
import './LoginForm.css';
import { userContext } from './App';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(userContext);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v0/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login failed:', data.error);
        return;
      }

      // Store token and set user
      localStorage.setItem('token', data.token);
      setUser({ id: data.user.id, username: data.user.username });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sammy's</h1>
        
        <div className="login-form">
          <div className="form-group">
            <label className="form-label">username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button onClick={handleSubmit} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;