export interface ChatMessageRequest {
  content: string;
}

export interface ChatMessageResponse {
  conversation_id: string; // Assuming UUIDs are represented as strings in JS/TS
  user_message_id: string;
  ai_response_message_id: string;
  response_content: string;
}
