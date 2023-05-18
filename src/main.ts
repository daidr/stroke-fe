import './assets/main.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const head = createHead()

app.use(head)
app.use(createPinia())
app.use(router)
app.use(VueViewer)

app.mount('#app')
