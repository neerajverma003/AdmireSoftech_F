import { DEFAULT_CHATBOT_CONFIG } from '../../../api/chatbotApi';

export { DEFAULT_CHATBOT_CONFIG };

// Helper to format timestamps for message bubbles
export const formatTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
