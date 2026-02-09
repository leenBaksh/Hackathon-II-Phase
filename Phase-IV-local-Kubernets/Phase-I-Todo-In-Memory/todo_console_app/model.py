from dataclasses import dataclass, field
from datetime import datetime
import uuid

@dataclass
class Task:
    description: str
    completed_status: bool = False
    created_timestamp: datetime = field(default_factory=datetime.now)
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
