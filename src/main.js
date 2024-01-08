import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'
import store from './store'

const app = createApp(App)

initializeRouter(app)

app.use(store)
app.mount('#app')
