import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'
import store from './store'
import { useToast } from './composables/useToast'

const app = createApp(App)

initializeRouter(app)

app.use(store)
app.provide('toast', useToast())

app.mount('#app')
