'use client'

import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  message: string
  isUser: boolean
  timestamp?: Date
  isTyping?: boolean
}

export function MessageBubble({ message, isUser, timestamp, isTyping }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex gap-3 mb-4 animate-fade-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      )}
      
      <div className={cn(
        'max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
        isUser
          ? 'bg-blue-500 text-white ml-auto'
          : 'bg-slate-700 text-slate-100 border border-slate-600'
      )}>
        {isTyping ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap break-words">{message}</p>
            {timestamp && (
              <p className={cn(
                'text-xs mt-1 opacity-70',
                isUser ? 'text-blue-100' : 'text-slate-400'
              )}>
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  )
}