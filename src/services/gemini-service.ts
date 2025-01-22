import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject, type CoreMessage } from 'ai';

import { zSchema } from '../utils/schema';

import type { Message } from '../types/Message';

const systemPrompt =
  'I need you to complete this task as efficiently as possible, minimizing resource usage and time spent. Prioritize the most direct and effective approach to achieve the desired outcome. Please be truthful and accurate in your responses, avoiding any form of deception or misinformation.';

async function chat({
  geminiModel,
  messages,
  schema,
}: {
  geminiModel: string;
  messages: Pick<Message, 'role' | 'content'>[];
  schema?: any;
}) {
  const model = createGoogleGenerativeAI({ apiKey: import.meta.env.VITE_PUBLIC_GEMINI_API });
  const gemini = model(geminiModel, { structuredOutputs: true });

  const { object, usage } = await generateObject<{ id: number; content: string; role: string }>({
    model: gemini,
    schema: schema || zSchema,
    system: systemPrompt,
    messages: messages as unknown as CoreMessage[],
  });

  return { ...object, meta: usage };
}

export default { chat };

// import { GoogleGenerativeAI } from '@google/generative-ai';
// import type { ChatHistory } from '../types/ChatHistory';
// import type { Message } from '../types/Message';
//
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_PUBLIC_GEMINI_API!);
//
// const getModel = () => {
//   const model = genAI.getGenerativeModel({
//     model: import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
//   });
//
//   return model;
// };
//
// const generateText = async (prompt: string) => {
//   const model = genAI.getGenerativeModel({
//     model: import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
//   });
//   model.generationConfig.responseMimeType = 'text';
//   const result = await model.generateContent(prompt);
//   return result.response.text();
// };
//
// const systemPrompt =
//   'I need you to complete this task as efficiently as possible, minimizing resource usage and time spent. Prioritize the most direct and effective approach to achieve the desired outcome. Please be truthful and accurate in your responses, avoiding any form of deception or misinformation.';
//
// const generateReponseWithSchema = async (prompt: string, schema: any) => {
//   const model = genAI.getGenerativeModel({
//     model: import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
//     generationConfig: {
//       responseMimeType: 'application/json',
//       responseSchema: schema,
//     },
//   });
//
//   const result = await model.generateContent(`${systemPrompt}This is the prompt: ${prompt}`);
//
//   return { ...JSON.parse(result.response.text()), meta: result.response.usageMetadata };
// };
//
// const chat = async ({
//   geminiModel,
//   history,
//   message,
//   schema,
// }: {
//   geminiModel: string;
//   history: ChatHistory;
//   message: string;
//   schema: any;
// }): Promise<Message> => {
//   const model = genAI.getGenerativeModel({
//     model: geminiModel || import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
//   });
//
//   const chatSession = model.startChat({
//     generationConfig: {
//       temperature: 1,
//       topP: 0.95,
//       topK: 40,
//       maxOutputTokens: 8192,
//       responseSchema: schema,
//       responseMimeType: 'application/json',
//     },
//     history,
//   });
//
//   const result = await chatSession.sendMessage(`${systemPrompt}This is the prompt: ${message}`);
//   return { ...JSON.parse(result.response.text()), meta: result.response.usageMetadata };
// };
//
// export { getModel, generateText, generateReponseWithSchema, chat };
