import type { RendererElement, RendererNode } from './renderer'
import type { VNodeProps, VNodeTypes } from './vnode'

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement,
> {
  createElement: (type: VNodeTypes) => HostElement

  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode | HostElement, parent: HostElement, anchor?: HostNode | null) => void

  patchProp: (node: HostElement, props: VNodeProps) => void
}
