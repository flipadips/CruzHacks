-- Cruzhacks Database Schema

-- Drop existing tables (for development/testing)
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), 
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  coordinates JSONB
);

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), 
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
