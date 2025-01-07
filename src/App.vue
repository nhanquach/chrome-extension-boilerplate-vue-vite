<script setup lang="ts">
import { ref } from 'vue';

import ChatBox from './components/ChatBox.vue';
import ChatMessage from './components/ChatMessage.vue';

import schema from './utils/schema';
import { generateReponseWithSchema } from './services/gemini-service';

import type { Message } from './types/Message';

const messageList = ref<Message[]>([]);
const loading = ref(false);

async function sendMessage(message: Message) {
  try {
    messageList.value.push(message);
    loading.value = true;

    const aiResponse = await generateReponseWithSchema(message.content, schema);
    messageList.value.push({ ...aiResponse, role: 'AI Assistant', timestamp: Date.now() });
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
      <div class="content">
        <ChatMessage v-for="message in messageList" :key="message.id" :message="message" />
      </div>
      <div class="loading loading-dots m-4" v-if="loading">Loading...</div>
      <div :class="['bottom-0 left-0 right-0 max-w-2xl m-auto', messageList.length > 5 ? 'sticky' : 'absolute']">
        <ChatBox @send-message="sendMessage" :loading="loading" />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
