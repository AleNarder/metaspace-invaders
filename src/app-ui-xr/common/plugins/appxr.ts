import { App } from "vue"

export default {
    install (app: App<Element>) {
        // @ts-expect-error ts(2339)
        app.config.globalProperties.$appXR = window.appxr
    }
}