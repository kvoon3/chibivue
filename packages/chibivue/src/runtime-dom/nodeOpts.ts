import type { RendererOptions } from '../runtime-core/rendererOpts'

export const nodeOpts: RendererOptions<Node> = {
  setTextContent(node, text) {
    node.textContent = text
  },
}
