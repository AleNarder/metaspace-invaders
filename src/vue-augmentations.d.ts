import { AppXR } from "./app-xr/core/main"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $appXR: AppXR
  }
}
