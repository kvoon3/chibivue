import type { App, ComponentOptions } from '../types'
import { createAppApi } from '../runtime-core/apiCreateApp'
import { createRender } from '../runtime-core/renderer'
import { nodeOpts } from './nodeOpts'
import { patchProp } from './patchProp'

const { render, patch } = createRender({ ...nodeOpts, patchProp })
const createAppDOM = createAppApi(render, patch)

export function createApp(rootComponent: ComponentOptions): App {
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
