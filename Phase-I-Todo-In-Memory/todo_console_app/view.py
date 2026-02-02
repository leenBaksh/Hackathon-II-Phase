from typing import List
from .model import Task

def display_menu():
    print("\n--- To-Do List Menu ---")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Mark Task as Complete")
    print("4. Update Task")
    print("5. Delete Task")
    print("6. Quit")
    print("-----------------------")

def get_user_input(prompt: str) -> str:
    return input(prompt).strip()

def display_tasks(tasks: List[Task]):
    print("\n--- Your Tasks ---")
    if not tasks:
        print("Your to-do list is empty.")
    else:
        # Sort tasks by creation time for consistent order
        sorted_tasks = sorted(tasks, key=lambda t: t.created_timestamp)
        for i, task in enumerate(sorted_tasks):
            status = "X" if task.completed_status else " "
            # Show a short version of the UUID for readability
            short_id = task.id.split('-')[0]
            print(f"{i+1}. [{status}] {task.description} (ID: {short_id})")
    print("------------------")

def show_message(message: str):
    print(message)

def show_error(message: str):
    print(f"Error: {message}")
