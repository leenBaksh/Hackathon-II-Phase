# Quick Start Guide

## Prerequisites
- Python 3.8 or higher
- Neon PostgreSQL database URL

## Setup (5 minutes)

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your database URL
# DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

### 3. Verify Setup
```bash
python test_setup.py
```

### 4. Run the Application
```bash
# Option 1: Direct Python
python main.py

# Option 2: Uvicorn with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Test the API
Open your browser and go to:
- Health Check: http://localhost:8000/health
- API Docs: http://localhost:8000/docs
- Root: http://localhost:8000/

Expected health check response:
```json
{
  "status": "ok",
  "database": "connected"
}
```

## Troubleshooting

### "DATABASE_URL environment variable is not set"
- Make sure you created the `.env` file
- Check that DATABASE_URL is set in `.env`
- Verify the .env file is in the `backend/` directory

### "Database unavailable" on /health endpoint
- Verify your Neon PostgreSQL database is running
- Check the DATABASE_URL connection string is correct
- Ensure `sslmode=require` is included in the URL
- Test connectivity from your machine to Neon

### Import errors
- Activate your virtual environment
- Run `pip install -r requirements.txt` again
- Make sure you're in the `backend/` directory

### Port already in use
- Change the PORT in `.env` to another value (e.g., 8001)
- Or kill the process using port 8000

## Next Steps

1. Add authentication endpoints
2. Implement CRUD operations for tasks
3. Add user registration and login
4. Connect to frontend application

## File Structure

```
backend/
├── main.py              # FastAPI app with /health endpoint
├── config.py            # Environment variable configuration
├── database.py          # Database session management
├── models/              # SQLModel database models
│   ├── user.py         # User model
│   └── task.py         # Task model
├── requirements.txt     # Python dependencies
├── .env                # Your environment variables (create this)
├── .env.example        # Example environment file
└── test_setup.py       # Setup verification script
```

## API Endpoints (Current)

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| GET | / | API information | 200 |
| GET | /health | Health check with DB test | 200 / 503 |
| GET | /docs | Interactive API documentation | 200 |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| DATABASE_URL | Yes | - | PostgreSQL connection string |
| PORT | No | 8000 | Server port |
| ENVIRONMENT | No | development | Environment mode |
