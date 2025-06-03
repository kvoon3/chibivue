import type { VNodeProps } from './vnode'

export interface RendererOptions<HostNode = any> {
  createElement: (type: string) => HostNode

  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode, parent: HostNode, anchor?: HostNode | null) => void

  patchProp: (node: HostNode, props: VNodeProps) => void
}
