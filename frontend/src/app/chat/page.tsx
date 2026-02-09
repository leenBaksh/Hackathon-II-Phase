'use client';

import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
// import { ChatMessageRequest, ChatMessageResponse } from '@/types/chat'; // Not directly used here anymore
import useAuth from '@/hooks/useAuth';
import { sendMessageToChatbot } from '@/services/chat'; // Import the new service

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const { getToken } = useAuth();

  const handleSendMessage = async (messageContent: string) => {
    const userMessage = { sender: 'user', content: messageContent };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const token = getToken();

    if (!token) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', content: 'Please log in to chat.' }]);
      return;
    }

    try {
      const data = await sendMessageToChatbot(messageContent, token); // Use the service
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', content: data.response_content }]);
    } catch (error: any) { // Catch as 'any' for now to simplify error handling
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', content: `Error: ${error.message || 'Could not send message.'}` }]);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f8f8', borderBottom: '1px solid #eee', margin: 0 }}>AI Todo Chatbot</h1>
      <ChatInterface onSendMessage={handleSendMessage} messages={messages} />
    </div>
  );
};

export default ChatPage;