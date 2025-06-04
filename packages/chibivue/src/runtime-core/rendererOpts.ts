import type { RendererElement, RendererNode } from './renderer'
import type { VNodeProps } from './vnode'

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement,
> {
  createElement: (type: string) => HostElement

  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode | HostElement, parent: HostElement, anchor?: HostNode | null) => void

  patchProp: (node: HostElement, props: VNodeProps) => void
}
