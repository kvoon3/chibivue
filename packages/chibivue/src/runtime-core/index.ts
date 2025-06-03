import type { Component } from '../types'
import { nodeOpts } from '../runtime-dom/renderer'

export function createAppCore(rootComponent: Component): {
  mount: (rootContainer: Node) => void
} {
  return {
    mount(rootContainer) {
      const message = rootComponent.render()

      nodeOpts.setTextContent(rootContainer, message)
    },
  }
}
