// @ts-nocheck
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const isArcBrowser = getComputedStyle(document.documentElement).getPropertyValue('--arc-palette-title');

if (import.meta.env.VITE_UI_ONLY !== 'true' && !isArcBrowser) {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));
}

createApp(App).mount('#app');
