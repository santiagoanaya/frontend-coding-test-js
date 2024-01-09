import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'
import store from './store'
import { useToast } from './composables/useToast'
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

initializeRouter(app)

app.use(store)
app.provide('toast', useToast())

app.mount('#app')
