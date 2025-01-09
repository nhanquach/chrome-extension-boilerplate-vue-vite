<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ollama from 'ollama/browser';

import ChatBox from './components/ChatBox.vue';
import ChatMessage from './components/ChatMessage.vue';

import schema from './utils/schema';
import { generateReponseWithSchema } from './services/gemini-service';

import type { Message } from './types/Message';

const model = 'llama3.2:latest';

const loading = ref(false);
const messageList = ref<Message[]>([]);
const modelList = ref<Model[]>([{ model: 'gemini-1.5', name: 'Gemini 1.5 Flash', tag: 'gemini' }]);

// export OLLAMA_ORIGINS=* && ollama serve
onMounted(async () => {
  const list = (await ollama.list()) || {};
  const ollamaModels = Object.values(list.models || {}).map((model: Object) => ({ ...model, tag: 'ollama' }) as Model);
  modelList.value.push(...ollamaModels);
});

async function sendMessage(message: Message, model: string) {
  try {
    loading.value = true;

    const history = messageList.value.map(({ role, content }) => ({ role, content }));
    messageList.value.push(message);

    const selectedModel = modelList.value.find(m => m.model === model);

    if (selectedModel?.tag === 'ollama') {
      const chat = { role: 'user', content: message.content };

      const response = await ollama.chat({ model: selectedModel.model, messages: [...history, chat], stream: false });

      messageList.value.push({
        role: 'AI Assistant',
        content: response.message.content,
        timestamp: Date.now(),
        id: Date.now(),
      });
    }

    if (selectedModel.tag === 'gemini') {
      const aiResponse = await generateReponseWithSchema(message.content, schema);
      messageList.value.push({ ...aiResponse, role: 'AI Assistant', timestamp: Date.now() });
    }
  } catch (error) {
    messageList.value.push({
      role: 'Error',
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
      <div class="content min-h-[calc(100vh-96px-120px)]">
        <ChatMessage v-for="message in messageList" :key="message.id" :message="message" />
        <div class="loading loading-dots m-4" v-if="loading">Loading...</div>
      </div>
      <div :class="['bottom-2 left-0 right-0 max-w-2xl m-auto', messageList.length > -1 ? 'sticky' : 'absolute']">
        <ChatBox :model-list="modelList" :model="model" @send-message="sendMessage" :loading="loading" />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
