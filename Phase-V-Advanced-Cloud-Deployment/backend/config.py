"""
Configuration module for FastAPI backend.

Loads and validates environment variables, providing fail-fast behavior
with clear error messages if required configuration is missing.
"""

import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Application configuration loaded from environment variables."""

    def __init__(self):
        """
        Initialize configuration and validate required environment variables.

        Raises:
            ValueError: If DATABASE_URL is not set in environment variables.
        """
        self.database_url: str = self._get_required_env("DATABASE_URL")
        self.port: int = int(os.getenv("PORT", "8000"))
        self.environment: str = os.getenv("ENVIRONMENT", "development")

    @staticmethod
    def _get_required_env(key: str) -> str:
        """
        Get a required environment variable.

        Args:
            key: The environment variable name.

        Returns:
            The environment variable value.

        Raises:
            ValueError: If the environment variable is not set.
        """
        value: Optional[str] = os.getenv(key)
        if not value:
            raise ValueError(
                f"Required environment variable '{key}' is not set. "
                f"Please check your .env file or environment configuration."
            )
        return value

    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment.lower() == "development"

    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment.lower() == "production"


# Create a global config instance
config = Config()
