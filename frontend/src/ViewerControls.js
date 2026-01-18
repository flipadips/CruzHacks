import './HomePage.css';
import { useContext } from 'react';
import { userContext } from './App';

function ParameterWindow({ parameters }) {
  const {user} = useContext(userContext);
  return (
    <div className="parameter-window">
      <h3>Welcome, {user.username}</h3>
      {/* Add your parameter controls here */}
    </div>
  );
}

export default ParameterWindow;