import { GoogleGenerativeAI } from '@google/generative-ai';

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

export { getModel, generateText, generateReponseWithSchema };
