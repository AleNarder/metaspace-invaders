import { App } from "vue"



export default {
    install (app: App<Element>) {
        
        // Lazy Loding -- TODO, usare proxy
        
        app.config.globalProperties.$appXR = {
            
        }
    }
}