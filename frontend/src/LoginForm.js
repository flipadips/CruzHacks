import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login submitted:', { username, password });
    // login logic here
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