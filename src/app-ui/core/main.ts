import { createApp } from 'vue'
import vuetify from '../common/plugins/vuetify'
import appxr from "../common/plugins/appxr"
import pinia from "../common/plugins/pinia"
import router from "./router"
import App from './App.vue'

createApp(App)
.use(router)
.use(pinia)
.use(appxr)
.use(vuetify)
.mount('#app-ui')