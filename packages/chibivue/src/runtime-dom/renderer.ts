import type { RendererOptions } from '../runtime-core/renderer'

export const nodeOpts: RendererOptions<Node> = {
  setTextContent(node, text) {
    node.textContent = text
  },
}
