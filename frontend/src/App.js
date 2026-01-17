import LoginForm from './LoginForm';
import HomePage from './HomePage';

import { createContext, useState } from 'react';
import './App.css';

export const userContext = createContext('');

function App() {
  const [user, setUser] = useState('');
  return (

  <userContext.Provider value={{user, setUser}}>
    {!user && <LoginForm/>}
    {user && <HomePage/>}
  </userContext.Provider>
  );
}

export default App;