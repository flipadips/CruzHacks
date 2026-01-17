import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('Loading...');
  const [databaseStatus, setDatabaseStatus] = useState('Loading...');

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      // Check backend health
      const healthRes = await axios.get('/api/health');
      setBackendMessage(healthRes.data.status);

      // Check database connection
      const dataRes = await axios.get('/api/data');
      setDatabaseStatus(`Connected to database at ${dataRes.data.timestamp.now}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setBackendMessage('Error connecting to backend');
      setDatabaseStatus('Error connecting to database');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Cruzhacks App</h1>
        <div className="status-box">
          <p><strong>Backend:</strong> {backendMessage}</p>
          <p><strong>Database:</strong> {databaseStatus}</p>
        </div>
        <button onClick={fetchBackendData}>Refresh Status</button>
      </header>
    </div>
  );
}

export default App;
