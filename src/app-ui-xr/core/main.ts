import { createApp } from 'vue'
import vuetify from '../common/plugins/vuetify'
import appxr from "../common/plugins/appxr"
import App from './App.vue'

function run () {
    createApp(App)
    .use(appxr)
    .use(vuetify)
    .mount('#app-ui-xr')
}
