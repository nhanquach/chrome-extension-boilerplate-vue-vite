<template>
  <div class="card w-full card-compact my-1">
    <div class="card-body">
      <div class="flex justify-between flex-wrap align-middle">
        <strong>{{ message.role }}</strong>
        <small>{{ new Date(message.timestamp).toLocaleString() }}</small>
      </div>
      <p>{{ message.content }}</p>
      <small v-if="message.meta && message.meta.candidatesTokenCount"
        >Token: {{ message.meta.candidatesTokenCount }}</small
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types/Message';

defineProps<{ message: Message }>();
</script>
