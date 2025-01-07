// @ts-nocheck
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

if (import.meta.env.VITE_UI_ONLY !== 'true') {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));
}

createApp(App).mount('#app');
