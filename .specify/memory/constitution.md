<!--
Sync Impact Report:
Version change: (none) -> 1.0.0
Modified principles:
  - Natural language interface for task management
  - Stateless architecture with persistent conversation storage
  - Secure user isolation across all AI components
  - Transparent tool execution (visible tool calls)
  - Integration with existing Todo system (Phase II)
Added sections:
  - Key Standards
  - Constraints
  - Success Criteria
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .claude/commands/sp.adr.md ⚠ pending
  - .claude/commands/sp.analyze.md ⚠ pending
  - .claude/commands/sp.checklist.md ⚠ pending
  - .claude/commands/sp.clarify.md ⚠ pending
  - .claude/commands/sp.constitution.md ⚠ pending
  - .claude/commands/sp.git.commit_pr.md ⚠ pending
  - .claude/commands/sp.implement.md ⚠ pending
  - .claude/commands/sp.phr.md ⚠ pending
  - .claude/commands/sp.plan.md ⚠ pending
  - .claude/commands/sp.reverse-engineer.md ⚠ pending
  - .claude/commands/sp.specify.md ⚠ pending
  - .claude/commands/sp.tasks.md ⚠ pending
  - .claude/commands/sp.taskstoissues.md ⚠ pending
  - README.md ⚠ pending
Follow-up TODOs: None
-->
# AI-Powered Todo Chatbot with MCP Architecture Constitution

## Core Principles

### 1. Natural language interface for task management
Every feature must provide a natural language interface for task management, enabling intuitive user interaction.

### 2. Stateless architecture with persistent conversation storage
The system must maintain a stateless architecture with conversation state persistently stored in the database.

### 3. Secure user isolation across all AI components
Strict measures must be in place to ensure secure isolation of user data and interactions across all AI components.

### 4. Transparent tool execution (visible tool calls)
All tool executions performed by the AI agent must be transparent and visible to the user, enhancing trust and debugging.

### 5. Integration with existing Todo system (Phase II)
The new system must seamlessly integrate with the existing Todo system from Phase II, preserving its functionality and data.

## Key Standards

-   MCP server follows official SDK patterns
-   OpenAI Agents SDK for reliable tool calling
-   Database models for conversation state (Conversation, Message)
-   All operations filtered by authenticated user
-   Graceful error handling for AI/tool failures

## Constraints

-   Use MCP SDK for tool server
-   OpenAI Agents SDK for AI agent logic
-   ChatKit for frontend chat interface
-   FastAPI backend with existing database
-   Stateless request cycle (no server-side memory)
-   Must work alongside existing REST API

## Success Criteria

-   Natural language commands successfully manage todos
-   MCP tools perform all CRUD operations
-   Conversations persist across sessions
-   Agent correctly interprets user intent
-   Phase II features remain fully functional

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

The constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan. All PRs/reviews must verify compliance. Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09
