import type { App, Component } from '../types'
import { createAppApi } from '../runtime-core/apiCreateApp'
import { createRender } from '../runtime-core/renderer'
import { nodeOpts } from './nodeOpts'
import { patchProp } from './patchProp'

const { render } = createRender({ ...nodeOpts, patchProp })
const createAppDOM = createAppApi(render)

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
