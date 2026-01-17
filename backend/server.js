const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'cruzhacks_db',
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.warn('Database connection warning:', err.message);
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Connected to database',
      timestamp: result.rows[0],
    });
  } catch (err) {
    console.warn('Database query warning:', err.message);
    res.json({
      message: 'Backend running (database not connected)',
      warning: 'PostgreSQL is not running. Start PostgreSQL to enable database features.',
      timestamp: new Date().toISOString(),
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
