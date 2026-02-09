import sys
import os

# Add the backend directory to Python path FIRST (before any imports)
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
    
# Also add parent directory to ensure src imports work
parent_dir = os.path.dirname(backend_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

# Set environment variable for module discovery
os.environ['PYTHONPATH'] = backend_dir + os.pathsep + os.environ.get('PYTHONPATH', '')

# Import and run the main application
from src.main import app

if __name__ == "__main__":
    import uvicorn
    print("Starting AuraFlow backend server...")
    print("Server will be available at http://localhost:8000")
    print("Press Ctrl+C to stop")
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=False)