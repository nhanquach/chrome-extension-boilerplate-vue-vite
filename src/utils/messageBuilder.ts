import type { Message } from '../types/Message';

export function buildMessage(message: Partial<Message>): Message {
  return {
    id: message.id || Date.now(),
    role: message.role || 'assistant',
    content: message.content || '',
    timestamp: message.timestamp || Date.now(),
    meta: message.meta || {},
  };
}
