import type { App, Component } from '../types'
import { createAppCore } from '../runtime-core'

export function createApp(rootComponent: Component): App {
  return {
    mount(selector) {
      const { mount } = createAppCore(rootComponent)

      const rootContainer = document.querySelector(selector)
      if (!rootContainer)
        return

      mount(rootContainer)
    },
  }
}
