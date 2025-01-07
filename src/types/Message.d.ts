type Message = {
  role: string;
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
