import { App } from "vue"
import { AppXR } from "../../../app-xr"

export default {
    install (app: App<Element>) {
        // @ts-expect-error ts(2339)
        app.config.globalProperties.$appXR = window.appxr
    }
}