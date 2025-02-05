<template>
  <div
    class="w-full card card-compact card-body card-bordered border-base-300 border-2 backdrop-blur-sm p-4 bg-base-100"
  >
    <form action="#" @submit.prevent="sendMessage" class="flex flex-col gap-2">
      <div class="flex items-center justify-start gap-2">
        <div class="form-control flex-1">
          <textarea
            type="text"
            id="userInput"
            ref="userInput"
            placeholder="Type your message..."
            class="textarea textarea-bordered w-full bg-transparent border-none focus:border-none focus:outline-none"
            v-model.trim="message"
            @keydown.meta="submitMessage"
            @keydown.ctrl="submitMessage"
          />
        </div>
      </div>
      <div class="flex justify-between align-middle">
        <select v-model="model" class="select max-w-sm select-sm">
          <option v-for="model in modelList" :key="model.model" :value="model.model">{{ model.name }}</option>
        </select>
        <div class="tooltip" data-tip="Ctrl+Enter to send">
          <button class="btn btn-outline btn-primary btn-sm" :disabled="loading || !message" type="submit">Send</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue';

import type { Message } from '../types/Message';
import type { Model } from '../types/Model';

const props = defineProps<{ loading: boolean; model: string; modelList: Model[] }>();
const emit = defineEmits(['send-message']);

const inputEl = useTemplateRef('userInput');
const model = ref(props.model);
const message = ref('');

function submitMessage(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

async function sendMessage() {
  if (!message.value) {
    return;
  }

  const newMessage: Message = {
    role: 'user',
    content: message.value,
    id: Date.now(),
    timestamp: Date.now(),
  };

  emit('send-message', newMessage, model.value);
  message.value = '';
}

onMounted(() => {
  inputEl.value?.focus();
});
</script>
