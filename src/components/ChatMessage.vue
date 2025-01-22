<template>
  <div class="card w-full card-compact my-1">
    <div class="card-body">
      <div class="flex justify-between flex-wrap align-middle">
        <strong class="capitalize">{{ message.role }}</strong>
        <small>{{ new Date(message.timestamp).toLocaleString() }}</small>
      </div>
      <p class="whitespace-pre-line">{{ message.content }}</p>
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
import type { Message } from '../types/Message';

defineProps<{ message: Message }>();

onMounted(() => {
  window.scrollTo({
    top: document.documentElement.scrollHeight + 400,
    behavior: 'smooth',
  });
});
</script>
