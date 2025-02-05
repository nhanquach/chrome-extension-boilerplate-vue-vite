// @ts-nocheck
import { createApp } from 'vue';
import Markdown from 'vue3-markdown-it';

import './style.css';
import 'highlight.js/styles/github.css';
import App from './App.vue';

// if (import.meta.env.VITE_UI_ONLY !== 'true' && !isArcBrowser) {
//   chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(error => console.error(error));
// }

const app = createApp(App);
app.use(Markdown);

app.mount('#app');
