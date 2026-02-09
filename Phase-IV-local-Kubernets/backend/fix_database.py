#!/usr/bin/env python3
"""
Database maintenance script for handling SQLite locks and concurrent writes.
"""

import os
import sqlite3
import time
from pathlib import Path

def check_database_locks(db_path: str = "database.db"):
    """Check for database locks and provide recommendations."""
    if not os.path.exists(db_path):
        print(f"Database {db_path} does not exist")
        return
    
    try:
        # Try to connect with timeout
        conn = sqlite3.connect(db_path, timeout=5)
        cursor = conn.cursor()
        
        # Check if database is locked
        cursor.execute("PRAGMA busy_timeout")
        busy_timeout = cursor.fetchone()[0]
        print(f"Current busy timeout: {busy_timeout}ms")
        
        # Set a longer timeout for concurrent operations
        cursor.execute("PRAGMA busy_timeout = 30000")  # 30 seconds
        cursor.execute("PRAGMA journal_mode = WAL")    # Enable WAL mode for better concurrency
        cursor.execute("PRAGMA synchronous = NORMAL") # Balance between safety and performance
        cursor.execute("PRAGMA cache_size = 10000")    # Increase cache size
        
        conn.commit()
        conn.close()
        
        print("Database configuration updated for better concurrency")
        
    except sqlite3.OperationalError as e:
        if "database is locked" in str(e):
            print("Database is currently locked. Possible solutions:")
            print("1. Wait for current operations to complete")
            print("2. Restart the application server")
            print("3. Check for long-running transactions")
        else:
            print(f"Database error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

def cleanup_temp_files():
    """Clean up temporary SQLite files."""
    temp_files = [
        "database.db-shm",
        "database.db-wal", 
        "database.db-journal"
    ]
    
    for temp_file in temp_files:
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
                print(f"Removed temporary file: {temp_file}")
            except Exception as e:
                print(f"Could not remove {temp_file}: {e}")

if __name__ == "__main__":
    print("Database Maintenance Script")
    print("=" * 40)
    
    # Change to backend directory
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)
    
    print("Checking database locks...")
    check_database_locks()
    
    print("\nCleaning up temporary files...")
    cleanup_temp_files()
    
    print("\nDatabase maintenance completed!")