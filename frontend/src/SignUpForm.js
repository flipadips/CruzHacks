import { useState, useContext } from 'react';
import './LoginForm.css';
import { userContext, createUserContext } from './App';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setSignup} = useContext(createUserContext);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://cruzhacks.onrender.com/api/v0/register', {
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
      console.log('Registration successful:', data.message);
      await handleRedirect();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

const handleRedirect = () => {
    setSignup(false);
}
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="form-label">Create your new account here </h1>
        
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
            Create
          </button>

          <button onClick={handleRedirect} className="signup-button">
            Cancel
          </button>
          </div>
          
      </div>
    </div>
  );
}

export default SignUpForm;