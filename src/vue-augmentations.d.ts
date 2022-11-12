import { AppXR } from "./app-xr"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $appXR: AppXR
  }
}
