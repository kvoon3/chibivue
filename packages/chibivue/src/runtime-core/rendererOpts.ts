import type { VNodeProps } from './vnode'

export interface RendererOptions<
  HostNode = any,
  HostElement = any,
> {
  createElement: (type: string) => HostNode

  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode, parent: HostNode, anchor?: HostNode | null) => void

  patchProp: (node: HostElement, props: VNodeProps) => void
}
