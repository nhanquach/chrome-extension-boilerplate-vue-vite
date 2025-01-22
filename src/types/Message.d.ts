type Message = {
  role: 'user' | 'assistant' | 'error';
  content: string;
  id: number;
  timestamp: number;
  meta?: {
    completionTokens?: number;
    promptTokens?: number;
    totalTokens?: number;
  };
};

export type { Message };
