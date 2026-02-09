# Database Models Documentation

## Overview

SQLModel database models for Multi-User Todo application with Neon Serverless PostgreSQL.

## Created Files

```
backend/
├── models/
│   ├── __init__.py          # Package initializer (exports User, Task)
│   ├── user.py              # User SQLModel definition
│   └── task.py              # Task SQLModel definition
├── database.py              # Database configuration and session management
├── init_database.py         # Database initialization script
├── test_models.py           # Model structure tests
└── DATABASE_MODELS.md       # This documentation
```

## Database Schema

### Table: `users`

User authentication and account information.

| Column         | Type         | Constraints                    | Description                  |
|----------------|--------------|--------------------------------|------------------------------|
| id             | INTEGER      | PRIMARY KEY, AUTO INCREMENT    | Unique user identifier       |
| email          | VARCHAR(255) | UNIQUE, INDEXED, NOT NULL      | User's email address         |
| password_hash  | VARCHAR(255) | NOT NULL                       | Bcrypt hashed password       |
| created_at     | TIMESTAMP    | NOT NULL, DEFAULT UTC NOW      | Account creation timestamp   |

**Indexes:**
- Primary key on `id`
- Unique index on `email`

### Table: `tasks`

Todo tasks with user ownership.

| Column         | Type         | Constraints                    | Description                  |
|----------------|--------------|--------------------------------|------------------------------|
| id             | INTEGER      | PRIMARY KEY, AUTO INCREMENT    | Unique task identifier       |
| user_id        | INTEGER      | FOREIGN KEY, INDEXED, NOT NULL | Owner user ID                |
| title          | VARCHAR(200) | NOT NULL                       | Task title                   |
| description    | TEXT         | NULLABLE                       | Detailed description         |
| status         | VARCHAR(50)  | NOT NULL                       | Task status                  |
| due_date       | DATE         | NULLABLE                       | Task deadline                |
| created_at     | TIMESTAMP    | NOT NULL, DEFAULT UTC NOW      | Creation timestamp           |
| updated_at     | TIMESTAMP    | NOT NULL, DEFAULT UTC NOW      | Last update timestamp        |

**Relationships:**
- `user_id` → FOREIGN KEY references `users.id`

**Indexes:**
- Primary key on `id`
- Index on `user_id` for efficient user task queries

**Valid Status Values:**
- `pending` - Task not started
- `in_progress` - Task being worked on
- `completed` - Task finished

## Model Definitions

### User Model (`models/user.py`)

```python
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(max_length=255, unique=True, index=True, nullable=False)
    password_hash: str = Field(max_length=255, nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
```

### Task Model (`models/task.py`)

```python
from datetime import date, datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", nullable=False, index=True)
    title: str = Field(max_length=200, nullable=False)
    description: Optional[str] = Field(default=None)
    status: str = Field(max_length=50, nullable=False)
    due_date: Optional[date] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
```

## Database Configuration

### Connection Setup

The database engine is configured in `database.py` with optimal settings for Neon Serverless PostgreSQL:

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

### Key Features

1. **Connection Pooling**: Optimized for serverless cold starts
2. **Pre-ping Verification**: Ensures connections are alive before use
3. **Connection Recycling**: Prevents stale connections after 1 hour
4. **Timeout Handling**: 30-second timeout for connection acquisition

## Usage Examples

### Import Models

```python
from models import User, Task
from database import get_session
from sqlmodel import Session, select
```

### Create User

```python
def create_user(session: Session, email: str, password_hash: str) -> User:
    user = User(email=email, password_hash=password_hash)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
```

### Create Task

```python
from datetime import date

def create_task(session: Session, user_id: int, title: str, status: str) -> Task:
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

### Query User Tasks

```python
def get_user_tasks(session: Session, user_id: int) -> list[Task]:
    statement = select(Task).where(Task.user_id == user_id)
    tasks = session.exec(statement).all()
    return tasks
```

### Update Task

```python
from datetime import datetime

def update_task_status(session: Session, task_id: int, new_status: str) -> Task:
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
def delete_task(session: Session, task_id: int) -> bool:
    statement = select(Task).where(Task.id == task_id)
    task = session.exec(statement).first()

    if task:
        session.delete(task)
        session.commit()
        return True

    return False
```

## FastAPI Integration

### Dependency Injection

```python
from fastapi import Depends, FastAPI
from sqlmodel import Session, select
from database import get_session, init_db
from models import Task, User

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/users/{user_id}/tasks")
def get_user_tasks(user_id: int, session: Session = Depends(get_session)):
    statement = select(Task).where(Task.user_id == user_id)
    tasks = session.exec(statement).all()
    return tasks

@app.post("/users/{user_id}/tasks")
def create_task(user_id: int, task_data: dict, session: Session = Depends(get_session)):
    task = Task(
        user_id=user_id,
        title=task_data["title"],
        status=task_data["status"],
        description=task_data.get("description"),
        due_date=task_data.get("due_date")
    )
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
```

## Testing

### Run Model Structure Tests

```bash
cd backend
python test_models.py
```

This verifies model definitions without database connection.

### Initialize Database

```bash
cd backend
python init_database.py
```

This creates all tables in Neon PostgreSQL.

## Environment Setup

### Required Environment Variables

Create `.env` file in backend directory:

```env
DATABASE_URL=postgresql://username:password@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require
PORT=8000
ENVIRONMENT=development
```

### Neon PostgreSQL Connection String Format

```
postgresql://[username]:[password]@[host]/[database]?sslmode=require
```

Example:
```
postgresql://myuser:mypassword@ep-cool-mountain-12345.us-east-2.aws.neon.tech/mydb?sslmode=require
```

## Neon Serverless Best Practices

### Connection Management
1. Use `pool_pre_ping=True` to handle cold starts
2. Keep pool size moderate (5-15 connections)
3. Recycle connections regularly (1 hour)
4. Always close sessions after use

### Performance Optimization
1. Index foreign keys (`user_id` is indexed)
2. Index frequently queried columns (`email` is indexed)
3. Use efficient queries with filters
4. Implement pagination for large result sets

### Security
1. Always use parameterized queries (SQLModel handles this)
2. Enable SSL mode in connection string (`?sslmode=require`)
3. Hash passwords with bcrypt before storing
4. Validate user input before database operations
5. Use row-level security if needed for multi-tenancy

## Migration Strategy

For production, consider using Alembic for database migrations:

```bash
# Install Alembic
pip install alembic

# Initialize Alembic
alembic init migrations

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

## Monitoring

### Key Metrics to Monitor
1. Connection pool usage
2. Query execution time
3. Database size growth
4. Active connections count
5. Failed connection attempts

### Recommended Tools
- Neon Dashboard (built-in monitoring)
- PostgreSQL logs
- Application performance monitoring (APM)

## Next Steps

1. Implement FastAPI endpoints for CRUD operations
2. Add authentication middleware with Better Auth
3. Create Pydantic schemas for request/response validation
4. Set up proper error handling and logging
5. Write comprehensive tests for database operations
6. Configure CORS for frontend integration
7. Set up CI/CD pipeline with automated tests
8. Implement database backup strategy

## Resources

- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [Neon Documentation](https://neon.tech/docs/)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [FastAPI Database Tutorial](https://fastapi.tiangolo.com/tutorial/sql-databases/)
