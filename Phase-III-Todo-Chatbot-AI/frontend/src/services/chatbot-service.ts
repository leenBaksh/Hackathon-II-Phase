export interface ChatMessage {
  message: string
  conversation_id?: string
}

export interface ChatResponse {
  message: string
  conversation_id: string
  tool_calls?: Array<{
    tool_name: string
    parameters: Record<string, any>
  }>
}

export class ChatbotService {
  private baseUrl: string
  private userId: string | null = null

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  async sendMessage(message: string, conversationId?: string): Promise<ChatResponse> {
    if (!this.userId) {
      throw new Error('User ID is required. Please authenticate first.')
    }

    const payload: ChatMessage = {
      message,
      ...(conversationId && { conversation_id: conversationId })
    }

    try {
      const response = await fetch(`${this.baseUrl}/${this.userId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response from chatbot API:', text.substring(0, 200))
        throw new Error('Server returned an invalid response. Please check if the backend is running.')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to send message to chatbot')
    }
  }

  // Demo method for when backend is not available
  async sendDemoMessage(message: string): Promise<ChatResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Generate contextual responses based on message content
    const lowerMessage = message.toLowerCase()
    let response = ''

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "Hello! I'm AuraFlow AI, your personal task assistant. How can I help you manage your tasks today?"
    } else if (lowerMessage.includes('task') && lowerMessage.includes('create')) {
      response = "I can help you create a new task! Please tell me the task title, and I'll add it to your todo list. For example: 'Create a task called Buy groceries'"
    } else if (lowerMessage.includes('show') && lowerMessage.includes('task')) {
      response = "Here are your current tasks:\n\n📋 **Today's Tasks**\n• Complete project proposal\n• Review team feedback\n• Update documentation\n\nYou have 3 tasks pending. Would you like me to help you prioritize them?"
    } else if (lowerMessage.includes('priority')) {
      response = "Based on your deadlines and importance, here are your priorities:\n\n🔥 **High Priority**\n• Complete project proposal (Due today)\n\n⚡ **Medium Priority**\n• Review team feedback (Due tomorrow)\n\n📝 **Low Priority**\n• Update documentation (Due this week)"
    } else if (lowerMessage.includes('help')) {
      response = "I can help you with:\n\n• 📝 Creating and managing tasks\n• 📅 Setting reminders and deadlines\n• 🎯 Prioritizing your work\n• 📊 Tracking your progress\n• 💡 Productivity suggestions\n\nWhat would you like to do?"
    } else if (lowerMessage.includes('thank')) {
      response = "You're welcome! I'm always here to help you stay organized and productive. Is there anything else you'd like assistance with?"
    } else {
      response = `I understand you said: "${message}". I'm currently in demo mode, but I can help you with task management, setting reminders, and organizing your workflow. Try asking me to "show my tasks" or "create a new task"!`
    }

    return {
      message: response,
      conversation_id: 'demo-conversation-' + Date.now(),
      tool_calls: []
    }
  }
}

// Singleton instance
export const chatbotService = new ChatbotService()