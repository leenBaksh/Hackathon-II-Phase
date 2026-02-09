'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatWidgetProps {
  isOpen?: boolean
  onToggle?: () => void
  isFloating?: boolean
}

export function ChatWidget({ isOpen: controlledIsOpen, onToggle, isFloating = true }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm AuraFlow AI, your personal task assistant. I can help you manage your todo items, set reminders, and organize your workflow. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Internal state for uncontrolled usage
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `I received your message: "${message}". I'm currently in demo mode, but in the full version, I can help you create tasks, manage your todo list, and provide productivity suggestions!`,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return isFloating ? (
      <div className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
        "mobile-s:bottom-4 mobile-s:right-4",
        "tablet:bottom-8 tablet:right-8"
      )}>
        {/* Notification badge */}
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          New message
        </div>
        
        {/* Chat toggle button */}
        <Button
          onClick={handleToggle}
          className={cn(
            "w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
            "shadow-lg hover:shadow-xl transition-all duration-300 group",
            "mobile-s:w-12 mobile-s:h-12",
            "tablet:w-16 tablet:h-16"
          )}
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Button>
      </div>
    ) : null
  }

  return (
    <div className={cn(
      "bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden",
      isFloating ? (
        "fixed bottom-6 right-6 w-96 h-[600px] z-50 mobile-s:w-[calc(100vw-2rem)] mobile-s:h-[500px] mobile-s:bottom-4 mobile-s:right-4 mobile-s:rounded-b-2xl mobile-s:left-4 tablet:w-[450px] tablet:h-[650px] tablet:bottom-8 tablet:right-8"
      ) : (
        "w-full h-[600px] mobile-s:h-[500px] tablet:h-[650px]"
      )
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white">AuraFlow AI</h3>
            <p className="text-xs text-blue-100">Always here to help</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 p-1 h-8 w-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="text-white hover:bg-white/20 p-1 h-8 w-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {isLoading && (
              <MessageBubble
                message=""
                isUser={false}
                isTyping={true}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="px-4 py-2 bg-slate-800/50 border-t border-slate-700">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 whitespace-nowrap"
                onClick={() => handleSendMessage("Show me my today's tasks")}
              >
                📋 Today's Tasks
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 whitespace-nowrap"
                onClick={() => handleSendMessage("Create a new task")}
              >
                ➕ New Task
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 whitespace-nowrap"
                onClick={() => handleSendMessage("What are my priorities?")}
              >
                🎯 Priorities
              </Button>
            </div>
          </div>

          {/* Input area */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            placeholder="Ask me anything about your tasks..."
          />
        </>
      )}
    </div>
  )
}