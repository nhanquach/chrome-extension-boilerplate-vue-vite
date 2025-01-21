type ChatHistory = {
  role: 'user' | 'model';
  parts: List<{ text: string }>;
}[];

export type { ChatHistory };
