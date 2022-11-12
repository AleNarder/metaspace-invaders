import { App } from "vue"
import { AppXR } from "../../../app-xr"

export default {
    install (app: App<Element>) {
        app.config.globalProperties.$appXR = new AppXR({
            root: '#app-xr'
        })
    }
}