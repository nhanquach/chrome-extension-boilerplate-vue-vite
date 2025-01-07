<template>
  <div
    class="w-full card card-compact card-body card-bordered border-base-300 border-2 bg-base-200 backdrop-blur-sm p-4 bg-base-100"
  >
    <form action="#" @submit.prevent="sendMessage" class="flex flex-col gap-2">
      <div class="flex items-center justify-start gap-2">
        <div class="form-control flex-1">
          <textarea
            type="text"
            id="userInput"
            placeholder="Type your message..."
            class="textarea textarea-bordered w-full bg-transparent border-none focus:border-none focus:outline-none"
            v-model="message"
            @keydown.meta="submitMessage"
            @keydown.ctrl="submitMessage"
          />
        </div>
      </div>
      <div class="flex justify-between align-middle">
        <select class="select max-w-sm select-sm">
          <option>Gemini 1.5 flash</option>
        </select>
        <button class="btn btn-outline btn-primary btn-sm" :disabled="loading || !message" type="submit">Send</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Message } from '../types/Message';

defineProps<{ loading: boolean }>();
const emit = defineEmits(['send-message']);
const message = ref('');

function submitMessage(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  if (!message.value) {
    return;
  }
  const newMessage: Message = {
    role: 'user',
    content: message.value,
    id: Date.now(),
    timestamp: Date.now(),
  };

  console.log({ newMessage });

  emit('send-message', newMessage);
  message.value = '';
}
</script>
