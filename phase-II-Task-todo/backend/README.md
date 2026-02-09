# Backend - Multi-User Todo Application

FastAPI backend with SQLModel ORM and Neon Serverless PostgreSQL database.

## Project Structure

```
backend/
├── models/
│   ├── __init__.py          # Package initializer, exports User and Task
│   ├── user.py              # User SQLModel definition
│   └── task.py              # Task SQLModel definition
├── database.py              # Database engine, session management, init
├── config.py                # Environment configuration
├── requirements.txt         # Python dependencies
├── .env.example             # Example environment variables
└── README.md                # This file
```

## Database Models

### User Model (`backend/models/user.py`)

Stores user authentication and account information.

**Fields:**
- `id`: Optional[int] - Primary key (auto-incremented)
- `email`: str - Unique email address (max 255 chars, indexed)
- `password_hash`: str - Bcrypt hashed password (max 255 chars)
- `created_at`: datetime - Account creation timestamp (default: UTC now)

**Table:** `users`

**Indexes:**
- Primary key on `id`
- Unique index on `email`

### Task Model (`backend/models/task.py`)

Stores todo tasks with user association.

**Fields:**
- `id`: Optional[int] - Primary key (auto-incremented)
- `user_id`: int - Foreign key to users.id (indexed)
- `title`: str - Task title (max 200 chars, required)
- `description`: Optional[str] - Detailed description (optional)
- `status`: str - Task status (max 50 chars, required)
- `due_date`: Optional[date] - Task deadline (optional)
- `created_at`: datetime - Creation timestamp (default: UTC now)
- `updated_at`: datetime - Last modification timestamp (default: UTC now)

**Table:** `tasks`

**Relationships:**
- `user_id` foreign key references `users.id`

**Indexes:**
- Primary key on `id`
- Index on `user_id` for efficient user task queries

**Valid Status Values:**
- `pending` - Task not started
- `in_progress` - Task being worked on
- `completed` - Task finished

## Database Configuration (`backend/database.py`)

### Engine Setup

The database engine is configured with connection pooling optimized for Neon Serverless PostgreSQL:

```python
engine = create_engine(
    DATABASE_URL,
    echo=True,                # Logs SQL queries (set False in production)
    pool_size=5,              # Base connection pool size
    max_overflow=10,          # Additional connections when needed
    pool_timeout=30,          # Connection timeout (seconds)
    pool_recycle=3600,        # Recycle connections after 1 hour
    pool_pre_ping=True,       # Verify connections before use (critical for serverless)
)
```

### Key Functions

#### `get_session()`
Dependency function that provides database sessions with automatic cleanup.

**Usage in FastAPI:**
```python
from fastapi import Depends
from sqlmodel import Session, select
from backend.database import get_session
from backend.models import Task

@app.get("/tasks")
def get_tasks(session: Session = Depends(get_session)):
    statement = select(Task)
    tasks = session.exec(statement).all()
    return tasks
```

#### `init_db()`
Creates all database tables if they don't exist. Call on application startup.

**Usage:**
```python
from backend.database import init_db

@app.on_event("startup")
def on_startup():
    init_db()
```

## Environment Configuration

### Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Neon PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://username:password@ep-example-12345.us-east-2.aws.neon.tech/dbname?sslmode=require
   PORT=8000
   ENVIRONMENT=development
   ```

### Required Variables

- `DATABASE_URL`: Neon PostgreSQL connection string (required)
- `PORT`: Server port (default: 8000)
- `ENVIRONMENT`: Environment name (development/production)

## Installation

### Prerequisites
- Python 3.10+
- Neon PostgreSQL database
- pip or poetry

### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Dependencies

- `fastapi`: Web framework
- `sqlmodel`: SQLAlchemy + Pydantic ORM
- `pydantic`: Data validation
- `psycopg2-binary`: PostgreSQL adapter
- `python-dotenv`: Environment variable management
- `uvicorn`: ASGI server

## Database Initialization

### Create Tables

Run once to create all database tables:

```python
from backend.database import init_db

init_db()
```

Or integrate with FastAPI startup:

```python
from fastapi import FastAPI
from backend.database import init_db

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_db()
```

## Usage Examples

### Import Models

```python
from backend.models import User, Task
from backend.database import get_session
from sqlmodel import Session, select
```

### Create User

```python
from backend.models import User

def create_user(session: Session, email: str, password_hash: str):
    user = User(email=email, password_hash=password_hash)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
```

### Create Task

```python
from backend.models import Task
from datetime import date

def create_task(session: Session, user_id: int, title: str, status: str):
    task = Task(
        user_id=user_id,
        title=title,
        status=status,
        description="Optional description",
        due_date=date(2026, 12, 31)
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
```

### Query Tasks by User

```python
from sqlmodel import select
from backend.models import Task

def get_user_tasks(session: Session, user_id: int):
    statement = select(Task).where(Task.user_id == user_id)
    tasks = session.exec(statement).all()
    return tasks
```

### Update Task Status

```python
def update_task_status(session: Session, task_id: int, new_status: str):
    statement = select(Task).where(Task.id == task_id)
    task = session.exec(statement).first()

    if task:
        task.status = new_status
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)

    return task
```

### Delete Task

```python
def delete_task(session: Session, task_id: int):
    statement = select(Task).where(Task.id == task_id)
    task = session.exec(statement).first()

    if task:
        session.delete(task)
        session.commit()
        return True

    return False
```

## Neon Serverless Considerations

### Connection Pooling
- Pool is configured with `pool_pre_ping=True` to handle serverless cold starts
- Connections are recycled after 1 hour to prevent stale connections
- Use moderate pool sizes (5-15) for optimal serverless performance

### Best Practices
1. Always use context managers or dependency injection for sessions
2. Close sessions explicitly or use `get_session()` dependency
3. Handle connection timeouts gracefully
4. Monitor connection pool usage in production
5. Use Neon's connection pooling in combination with SQLModel's pooling

### Migrations
For production, consider using Alembic for database migrations:

```bash
pip install alembic
alembic init migrations
```

Configure `alembic.ini` with your DATABASE_URL and create migration scripts.

## Testing

Run tests with pytest (add tests in `tests/` directory):

```bash
pytest tests/
```

## Security Notes

1. Never commit `.env` file with actual credentials
2. Always hash passwords before storing (use bcrypt or argon2)
3. Use parameterized queries (SQLModel handles this automatically)
4. Enable SSL mode in DATABASE_URL (`?sslmode=require`)
5. Implement row-level security if needed for multi-tenancy

## Next Steps

1. Create FastAPI endpoints in `main.py` or `api/` directory
2. Implement authentication middleware using Better Auth
3. Add data validation with Pydantic models
4. Set up proper error handling and logging
5. Create database migration scripts with Alembic
6. Add comprehensive tests for models and endpoints
7. Configure CORS for frontend integration
8. Set up monitoring and alerting for production

## Resources

- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Neon Documentation](https://neon.tech/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
