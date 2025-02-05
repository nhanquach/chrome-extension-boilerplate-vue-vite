<template>
  <div class="card w-full card-compact my-1">
    <div class="card-body">
      <div class="flex justify-between flex-wrap align-middle">
        <strong class="capitalize">{{ message.role }}</strong>
        <small>{{ new Date(message.timestamp).toLocaleString() }}</small>
      </div>
      <Markdown class="chat-message-content leading-6 text-justify" :source="message.content" />
      <div class="flex gap-8">
        <small v-if="message.meta && message.meta.completionTokens">
          Completion Token: {{ message.meta.completionTokens }}
        </small>
        <small v-if="message.meta && message.meta.promptTokens">Prompt Token: {{ message.meta.promptTokens }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import Markdown from 'vue3-markdown-it';

import type { Message } from '../types/Message';

defineProps<{ message: Message }>();

onMounted(() => {
  window.scrollTo({
    top: document.documentElement.scrollHeight + 400,
    behavior: 'smooth',
  });
});
</script>

<style scoped>
::v-deep .chat-message-content pre code.hljs {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
}

::v-deep .chat-message-content code {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 8px;
}
</style>
