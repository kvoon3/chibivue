import type { RendererOptions } from '../runtime-core/rendererOpts'

export const nodeOpts: RendererOptions<Node> = {
  createElement(type: string) {
    return document.createElement(type)
  },

  createText(text: string) {
    return document.createTextNode(text)
  },

  setElementText(node, text: string) {
    node.textContent = text
  },

  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  },
}
