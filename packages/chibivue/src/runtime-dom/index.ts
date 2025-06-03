import type { App, Component } from '../types'
import { createAppApi } from '../runtime-core'
import { createRender } from '../runtime-core/renderer'
import { nodeOpts } from './renderer'

const { render } = createRender(nodeOpts)
export const createAppDOM = createAppApi(render)

export function createApp(rootComponent: Component): App {
  return {
    mount(selector) {
      const { mount } = createAppDOM(rootComponent)

      const rootContainer = document.querySelector(selector)
      if (!rootContainer)
        return

      mount(rootContainer)
    },
  }
}
