type Message = {
  role: 'user' | 'model' | 'error';
  content: string;
  id: number;
  timestamp: number;
  meta?: {
    candidatesTokenCount: string;
    promptTokenCount: string;
    totalTokenCount: string;
  };
};

export type { Message };
