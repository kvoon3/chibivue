import type { RendererElement, RendererNode } from './renderer'
import type { VNodeProps, VNodeTypes } from './vnode'

export interface RendererOptions<
  HostNode extends RendererNode = RendererNode,
  HostElement extends RendererElement = RendererElement,
> {
  createElement: (type: VNodeTypes) => HostElement

  createText: (text: string) => HostNode

  setText: (node: HostNode, text: string) => void

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode | HostElement, parent: HostElement, anchor?: HostNode | null) => void

  patchProp: (node: HostElement, props: VNodeProps) => void
}
