from openai import OpenAI
from ..mcp_tools.add_task import add_task # Our custom MCP tool
from ..mcp_tools.list_tasks import list_tasks # New custom MCP tool
from ..mcp_tools.complete_task import complete_task # New custom MCP tool
from ..mcp_tools.delete_task import delete_task # New custom MCP tool
from ..mcp_tools.update_task import update_task # New custom MCP tool
from uuid import UUID
from sqlmodel import Session, select # Import select for querying
from ..database import get_session
import json # Import json for safer parsing of function_args
from ..models.conversation import Conversation # Import Conversation model
from ..models.message import Message # Import Message model

class AIAgent:
    def __init__(self, openai_api_key: str):
        self.client = OpenAI(api_key=openai_api_key)
        self.tools = [
            {
                "type": "function",
                "function": {
                    "name": "add_task",
                    "description": "Adds a new todo item for a given user.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "title": {
                                "type": "string",
                                "description": "The title of the todo item."
                            },
                            "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "The UUID of the user who owns the task."
                            },
                            "description": {
                                "type": "string",
                                "description": "An optional detailed description of the todo item."
                            }
                        },
                        "required": ["title", "user_id"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "list_tasks",
                    "description": "Lists todo items for a given user based on their status. The default status is 'pending'.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "The UUID of the user who owns the tasks."
                            },
                            "status": {
                                "type": "string",
                                "enum": ["pending", "completed", "all"],
                                "description": "The status of tasks to list ('pending', 'completed', or 'all'). Defaults to 'pending'."
                            }
                        },
                        "required": ["user_id"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "complete_task",
                    "description": "Marks a todo item as completed for a given user.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "title": {
                                "type": "string",
                                "description": "The title of the todo item to complete."
                            },
                            "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "The UUID of the user who owns the task."
                            }
                        },
                        "required": ["title", "user_id"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "delete_task",
                    "description": "Deletes a todo item for a given user.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "title": {
                                "type": "string",
                                "description": "The title of the todo item to delete."
                            },
                            "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "The UUID of the user who owns the task."
                            }
                        },
                        "required": ["title", "user_id"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "update_task",
                    "description": "Updates an existing todo item for a given user. At least one of new_title or new_description must be provided.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "old_title": {
                                "type": "string",
                                "description": "The current title of the todo item to update."
                            },
                            "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "The UUID of the user who owns the task."
                            },
                            "new_title": {
                                "type": "string",
                                "description": "The new title for the todo item (optional)."
                            },
                            "new_description": {
                                "type": "string",
                                "description": "The new description for the todo item (optional)."
                            }
                        },
                        "required": ["old_title", "user_id"]
                    }
                }
            }
        ]

    async def process_message(self, user_id: UUID, message_content: str, session: Session) -> str:
        """
        Processes a user message using the OpenAI Agent and executes tools if necessary.
        """
        # Retrieve conversation history
        conversation = session.exec(select(Conversation).where(Conversation.user_id == user_id)).first()
        if not conversation:
            # If no conversation exists, create a new one
            conversation = Conversation(user_id=user_id)
            session.add(conversation)
            session.commit()
            session.refresh(conversation)

        # Retrieve last N messages for context (e.g., last 10 messages)
        MAX_HISTORY_MESSAGES = 10
        history_messages = session.exec(
            select(Message)
            .where(Message.conversation_id == conversation.id)
            .order_by(Message.timestamp.desc())
            .limit(MAX_HISTORY_MESSAGES)
        ).all()
        history_messages.reverse() # Sort oldest to newest

        messages_for_openai = [
            {"role": "system", "content": "You are a helpful assistant that manages todo lists using provided tools."},
        ]
        
        for msg in history_messages:
            messages_for_openai.append({"role": msg.sender, "content": msg.content})
        
        messages_for_openai.append({"role": "user", "content": message_content})


        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo", # Or another suitable model
            messages=messages_for_openai, # Pass the history as context
            tools=self.tools,
            tool_choice="auto",
        )
        response_message = response.choices[0].message

        tool_calls = response_message.tool_calls
        if tool_calls:
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                try:
                    function_args = json.loads(tool_call.function.arguments)
                except json.JSONDecodeError:
                    return "Error: Could not parse tool arguments."

                if function_name == "add_task":
                    try:
                        function_args["user_id"] = user_id
                        result = add_task(session=session, **function_args)
                        return result
                    except Exception as e:
                        return f"Error executing add_task: {e}"
                elif function_name == "list_tasks":
                    try:
                        function_args["user_id"] = user_id
                        result = list_tasks(session=session, **function_args)
                        return result
                    except Exception as e:
                        return f"Error executing list_tasks: {e}"
                elif function_name == "complete_task":
                    try:
                        function_args["user_id"] = user_id
                        result = complete_task(session=session, **function_args)
                        return result
                    except Exception as e:
                        return f"Error executing complete_task: {e}"
                elif function_name == "delete_task":
                    try:
                        function_args["user_id"] = user_id
                        result = delete_task(session=session, **function_args)
                        return result
                    except Exception as e:
                        return f"Error executing delete_task: {e}"
                elif function_name == "update_task":
                    try:
                        function_args["user_id"] = user_id
                        result = update_task(session=session, **function_args)
                        return result
                    except Exception as e:
                        return f"Error executing update_task: {e}"
                else:
                    return f"Unknown tool: {function_name}"
        else:
            return response_message.content or "I couldn't understand your request or generate a response."
