import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import { Pool } from 'pg';

import * as auth from './auth.js';
import * as posts from './posts.js';
import * as groups from './groups.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(cors());

// Swagger setup
const apiSpec = path.join(__dirname, './openapi.yaml');
const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(apidoc));

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

// Make pool available to route handlers
app.locals.pool = pool;

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Cruzhacks API',
    endpoints: {
      docs: `http://localhost:${PORT}/api/v0/docs`,
      health: '/api/health',
      posts: '/api/v0/posts',
      groups: '/api/v0/groups',
    },
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Data connection test route
app.get('/api/data', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Connected to database',
      timestamp: result.rows[0],
    });
  } catch (err) {
    res.json({
      message: 'Backend running (database not connected)',
      warning: 'PostgreSQL is not running. Start PostgreSQL to enable database features.',
      timestamp: new Date().toISOString(),
    });
  }
});

// Your routes go here; do NOT write them inline.
// Create additional modules and delegate to their exports.
app.post('/api/v0/login', auth.login);
app.get('/api/v0/posts', posts.getPosts);
app.post('/api/v0/posts', auth.authenticate, posts.createPost);
app.get('/api/v0/groups', auth.authenticate, groups.getGroups);
app.get('/api/v0/groups/:id/posts', auth.authenticate, groups.getGroupPosts);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors || [],
    status: err.status || 500,
  });
});

export default app;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api/v0/docs`);
});
