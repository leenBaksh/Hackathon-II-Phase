# Todo Console App - QWEN Context

## Project Overview

This is a Phase I implementation of an in-memory Python console application for managing to-do tasks. The application follows the Model-View-Controller (MVC) architectural pattern and implements all 5 core CRUD operations (Add, View, Update, Delete, Mark Complete).

The project was developed as part of a hackathon and was built entirely through an agentic development workflow using Claude Code with Spec-Kit Plus, with no manual coding.

### Architecture

The application consists of four main modules:

- **model.py**: Contains the `Task` dataclass that represents a single to-do item
- **service.py**: Implements the `TodoService` class with all business logic and CRUD operations
- **view.py**: Handles all user interface logic and console output formatting
- **main.py**: Contains the main application loop that orchestrates the other components

### Key Features

- Add new tasks with descriptions
- View all tasks with their completion status and timestamps
- Update existing task descriptions
- Delete tasks by ID
- Toggle task completion status
- In-memory storage (tasks persist only during the application session)
- Error handling for invalid inputs

## Building and Running

### Prerequisites

- Python 3.11+
- `uv` package manager (recommended) or `pip`

### Running the Application

To run the application, navigate to the project root directory and execute:

```bash
python -m todo_console_app.main
```

This will start the interactive console menu where you can perform various operations on your to-do list.

## Development Conventions

### Code Structure

- The application follows the MVC pattern with clear separation of concerns
- Each module has a single responsibility:
  - `model.py` defines the data structure
  - `service.py` handles business logic
  - `view.py` manages user interface
  - `main.py` coordinates the application flow
- Type hints are used throughout the codebase
- Standard library modules are used exclusively (no external dependencies)

### Data Model

The `Task` entity has the following attributes:
- `id`: A unique identifier (UUID string)
- `description`: The task description text
- `created_timestamp`: When the task was created (datetime)
- `completed_status`: Boolean indicating completion status (defaults to False)

### Error Handling

The application provides user-friendly error messages for:
- Empty task descriptions
- Invalid task IDs
- Non-existent tasks when performing operations
- Invalid menu choices

## Project Structure

```
D:\hackathon-II\Phase-I/
├── specs/
│   └── 001-python-console-todo/
│       ├── spec.md          # Feature specification
│       ├── data-model.md    # Data model definition
│       ├── quickstart.md    # Quickstart guide
│       ├── research.md      # Research notes
│       ├── plan.md          # Development plan
│       ├── tasks.md         # Task breakdown
│       └── checklists/      # Implementation checklists
└── todo_console_app/        # Main application package
    ├── __init__.py
    ├── main.py              # Application entry point
    ├── model.py             # Task data model
    ├── service.py           # Business logic layer
    └── view.py              # User interface layer
```

## Testing

The application can be tested by performing a full task lifecycle:
1. Add a task
2. View all tasks
3. Mark a task as complete/incomplete
4. Update a task description
5. Delete a task

The application includes error handling that can be tested by providing invalid inputs such as:
- Empty task descriptions
- Non-existent task IDs
- Invalid menu choices