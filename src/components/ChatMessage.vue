<template>
  <div class="card w-full card-compact my-1" ref="chat-message">
    <div class="card-body">
      <div class="flex justify-between flex-wrap align-middle">
        <strong class="capitalize">{{ message.role }}</strong>
        <small>{{ new Date(message.timestamp).toLocaleString() }}</small>
      </div>
      <p class="whitespace-pre-line">{{ message.content }}</p>
      <small v-if="message.meta && message.meta.candidatesTokenCount"
        >Token: {{ message.meta.candidatesTokenCount }}</small
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import type { Message } from '../types/Message';

const props = defineProps<{ message: Message }>();

const element = useTemplateRef('chat-message');

console.log('render');

onMounted(() => {
  console.log(element.value);
  if (props.message.role === 'user') {
    window.scrollTo(0, window.outerHeight + 400);
  } else if (element.value) {
    (element.value as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
});
</script>
