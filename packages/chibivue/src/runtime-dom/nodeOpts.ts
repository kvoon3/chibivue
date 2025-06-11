import type { RendererOptions } from '../runtime-core/rendererOpts'

export const nodeOpts: Omit<RendererOptions<Node, Element>, 'patchProp'> = {
  createElement(type) {
    return document.createElement(String(type))
  },

  createText(text) {
    return document.createTextNode(text)
  },

  setElementText(node, text) {
    node.textContent = text
  },

  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  },
}
