# Cruzhacks Application

A full-stack web application with React frontend, Express.js backend, and PostgreSQL database.

## Project Structure

```
cruzhacks/
├── backend/          # Express.js server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── .env.example  # Environment variables template
├── frontend/         # React application
│   ├── src/          # React source files
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- PostgreSQL (v12 or higher)

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd cruzhacks
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Configure Backend Environment
```bash
cp .env.example .env
```

Edit `.env` file with your PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cruzhacks_db
PORT=5000
```

### 4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## Setup PostgreSQL Database

1. **Create a new database:**
```sql
CREATE DATABASE cruzhacks_db;
```

2. **Connect to the database:**
```bash
psql -U postgres -d cruzhacks_db
```

3. **Create tables (example):**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

### Option 2: Run Both with npm scripts (from root directory)

```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm start
```

## Development

### Backend Development
Use `npm run dev` in the backend folder for auto-reload with nodemon:
```bash
cd backend
npm run dev
```

### Frontend Development
The React app has hot reload built-in with `npm start`

## API Endpoints

- `GET /api/health` - Check if backend is running
- `GET /api/data` - Test database connection

## Building for Production

### Build Frontend
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `build/` folder.

### Backend Production
The backend is already production-ready. Just ensure environment variables are set correctly.

## Deployment

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Deploy to your hosting platform (Heroku, AWS, Vercel, etc.)

## Troubleshooting

### Backend won't connect to database
- Check PostgreSQL is running
- Verify credentials in `.env` file
- Ensure database exists

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check `proxy` setting in frontend `package.json`
- Verify CORS is enabled in backend

### npm install fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## License

ISC
