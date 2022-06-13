import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import Shell from './Shell.vue'

const app = createApp(Shell)

app.use(router).use(createPinia()).mount('#app')
