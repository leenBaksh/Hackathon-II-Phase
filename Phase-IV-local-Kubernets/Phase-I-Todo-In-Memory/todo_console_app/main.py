from . import service
from . import view

def main_loop():
    """Main application loop."""
    todo_service = service.TodoService()
    
    # Add some dummy tasks for testing
    todo_service.add_task("Buy groceries")
    todo_service.add_task("Finish the report")

    while True:
        view.display_menu()
        choice = view.get_user_input("Enter your choice: ")

        if choice == '1':  # Add Task
            description = view.get_user_input("Enter task description: ")
            try:
                task = todo_service.add_task(description)
                view.show_message(f"Task '{task.description}' added.")
            except ValueError as e:
                view.show_error(str(e))

        elif choice == '2':  # View Tasks
            tasks = todo_service.get_all_tasks()
            view.display_tasks(tasks)

        elif choice == '3':  # Mark Task as Complete
            task_id_str = view.get_user_input("Enter the ID of the task to toggle: ")
            # Find the task by the short ID presented to the user
            task_to_toggle = None
            for t in todo_service.get_all_tasks():
                if t.id.startswith(task_id_str):
                    task_to_toggle = t
                    break
            
            if task_to_toggle:
                updated_task = todo_service.toggle_task_completion(task_to_toggle.id)
                status = "complete" if updated_task.completed_status else "incomplete"
                view.show_message(f"Task '{updated_task.description}' marked as {status}.")
            else:
                view.show_error("Task ID not found.")

        elif choice == '4':  # Update Task
            task_id_str = view.get_user_input("Enter the ID of the task to update: ")
            task_to_update = None
            for t in todo_service.get_all_tasks():
                if t.id.startswith(task_id_str):
                    task_to_update = t
                    break
            
            if task_to_update:
                new_description = view.get_user_input("Enter new description: ")
                try:
                    updated_task = todo_service.update_task(task_to_update.id, new_description)
                    view.show_message("Task updated successfully.")
                except ValueError as e:
                    view.show_error(str(e))
            else:
                view.show_error("Task ID not found.")

        elif choice == '5':  # Delete Task
            task_id_str = view.get_user_input("Enter the ID of the task to delete: ")
            task_to_delete = None
            for t in todo_service.get_all_tasks():
                if t.id.startswith(task_id_str):
                    task_to_delete = t
                    break

            if task_to_delete:
                if todo_service.delete_task(task_to_delete.id):
                    view.show_message("Task deleted successfully.")
            else:
                view.show_error("Task ID not found.")

        elif choice == '6':  # Quit
            view.show_message("Goodbye!")
            break

        else:
            view.show_error("Invalid choice. Please try again.")

if __name__ == "__main__":
    main_loop()
