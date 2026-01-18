import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import HomePage from './HomePage';

import { createContext, useState } from 'react';
import './App.css';

export const userContext = createContext('');
export const createUserContext = createContext('');

function App() {
  const [user, setUser] = useState('');
  const [signup, setSignup] = useState('');
  return (
  <userContext.Provider value={{user, setUser}}>
    <createUserContext.Provider value={{signup, setSignup}}>
      {!user && !signup && <LoginForm/>}
      {!user && signup && <SignUpForm/>}
      {user && <HomePage/>}
    </createUserContext.Provider>
  </userContext.Provider>
  );
}

export default App;