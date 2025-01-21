<script setup lang="ts">
import { ref, onMounted } from 'vue';

// @ts-ignore
import ollama from 'ollama/browser';

import ChatBox from './components/ChatBox.vue';
import ChatMessage from './components/ChatMessage.vue';

import schema from './utils/schema';
import { chat } from './services/gemini-service';

import type { Message } from './types/Message';
import type { Model } from './types/Model';
import type { ChatHistory } from './types/ChatHistory';

const geminiModels = [
  { model: 'gemini-2.0-flash-exp', name: 'Gemini 2.0', tag: 'gemini' },
  { model: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', tag: 'gemini' },
];

const loading = ref(false);
const messageList = ref<Message[]>([]);
const modelList = ref<Model[]>([...geminiModels]);

// export OLLAMA_ORIGINS=* && ollama serve
onMounted(async () => {
  const list = (await ollama.list()) || {};
  const ollamaModels = Object.values(list.models || {}).map((model: Object) => ({ ...model, tag: 'ollama' }) as Model);
  modelList.value.push(...ollamaModels);
});

async function sendMessage(message: Message, model: string) {
  try {
    loading.value = true;

    const prompt = { role: 'user', content: message.content };
    messageList.value.push(message);

    const selectedModel = modelList.value.find(m => m.model === model);

    if (!selectedModel) {
      return;
    }

    if (selectedModel.tag === 'ollama') {
      const history = messageList.value
        .slice(0, messageList.value.length - 1)
        .map(({ role, content }) => ({ role, content }));
      const response = await ollama.chat({ model: selectedModel.model, messages: [...history, prompt], stream: false });

      messageList.value.push({
        role: 'model',
        content: response.message.content,
        timestamp: Date.now(),
        id: Date.now(),
      });
    }

    if (selectedModel.tag === 'gemini') {
      const history: ChatHistory = messageList.value.slice(0, messageList.value.length - 1).map(({ role, content }) => {
        return {
          role,
          parts: [{ text: content }],
        };
      }) as ChatHistory;

      const aiResponse = await chat({ geminiModel: selectedModel.model, history, message: prompt.content, schema });
      console.log(aiResponse);
      messageList.value.push({
        role: 'model',
        content: aiResponse.content,
        timestamp: Date.now(),
        id: Date.now(),
        meta: aiResponse.meta,
      });
    }
  } catch (error) {
    messageList.value.push({
      role: 'error',
      content: 'Something went wrong.',
      timestamp: Date.now(),
      id: Date.now(),
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="navbar bg-base-200">
      <button class="btn btn-ghost text-xl">Sidebar AI</button>
    </div>
    <main class="container max-w-2xl mx-auto p-4 min-h-[calc(100vh-96px)] relative">
      <div class="content min-h-[calc(100vh-120px-120px)]">
        <ChatMessage v-for="message in messageList" :key="message.id" :message="message" />
        <div class="loading loading-dots m-4" v-if="loading">Loading...</div>
      </div>
      <div :class="['bottom-2 left-0 right-0 max-w-2xl m-auto', messageList.length > -1 ? 'sticky' : 'absolute']">
        <ChatBox :model-list="modelList" :model="modelList[0].model" @send-message="sendMessage" :loading="loading" />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
