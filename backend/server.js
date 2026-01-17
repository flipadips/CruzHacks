const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Cruzhacks API',
    endpoints: {
      docs: `http://localhost:${PORT}/api-docs`,
      health: '/api/health',
      data: '/api/data',
    },
  });
});

// Routes
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check if backend is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Backend is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Backend is running!
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get database connection status
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Database connection status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 warning:
 *                   type: string
 */
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
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});
