import { ChatMessageRequest, ChatMessageResponse } from '@/types/chat';

const API_BASE_URL = 'http://localhost:8000/api'; // Or your deployed backend URL

export const sendMessageToChatbot = async (
  messageContent: string,
  token: string
): Promise<ChatMessageResponse> => {
  if (!token) {
    throw new Error('Authentication token is required to send messages.');
  }

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ content: messageContent } as ChatMessageRequest),
  });

  // Check if response is JSON before parsing
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response from chat API:', text.substring(0, 200));
    throw new Error('Server returned an invalid response. Please check if the backend is running.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`);
  }

  return response.json();
};
