// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { generateText } from 'ai';
//
// import type { ChatHistory } from '../types/ChatHistory';
// import type { Message } from '../types/Message';
//
// async function chat({
//   geminiModel,
//   history,
//   message,
//   schema,
// }: {
//   geminiModel: string;
//   history: ChatHistory;
//   message: string;
//   schema: any;
// }) {
//   const model = createGoogleGenerativeAI({ apiKey: import.meta.env.VITE_PUBLIC_GEMINI_API,  });
//   console.log({ geminiModel, model });
//   const response = await generateText({
//     model,
//     prompt: 'Write a vegetarian lasagna recipe for 4 people.',
//   });
//
//   console.log(response);
// }
//
// export { chat };

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatHistory } from '../types/ChatHistory';
import type { Message } from '../types/Message';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_PUBLIC_GEMINI_API!);

const getModel = () => {
  const model = genAI.getGenerativeModel({
    model: import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
  });

  return model;
};

const generateText = async (prompt: string) => {
  const model = genAI.getGenerativeModel({
    model: import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
  });
  model.generationConfig.responseMimeType = 'text';
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const systemPrompt =
  'I need you to complete this task as efficiently as possible, minimizing resource usage and time spent. Prioritize the most direct and effective approach to achieve the desired outcome. Please be truthful and accurate in your responses, avoiding any form of deception or misinformation.';

const generateReponseWithSchema = async (prompt: string, schema: any) => {
  const model = genAI.getGenerativeModel({
    model: import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  const result = await model.generateContent(`${systemPrompt}This is the prompt: ${prompt}`);

  return { ...JSON.parse(result.response.text()), meta: result.response.usageMetadata };
};

const chat = async ({
  geminiModel,
  history,
  message,
  schema,
}: {
  geminiModel: string;
  history: ChatHistory;
  message: string;
  schema: any;
}): Promise<Message> => {
  const model = genAI.getGenerativeModel({
    model: geminiModel || import.meta.env.VITE_PUBLIC_GEMINI_MODEL!,
  });

  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseSchema: schema,
      responseMimeType: 'application/json',
    },
    history,
  });

  const result = await chatSession.sendMessage(`${systemPrompt}This is the prompt: ${message}`);
  return { ...JSON.parse(result.response.text()), meta: result.response.usageMetadata };
};

export { getModel, generateText, generateReponseWithSchema, chat };
