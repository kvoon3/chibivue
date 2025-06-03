export interface RendererOptions<HostNode = any> {
  createElement: (type: string) => HostNode

  createText: (text: string) => HostNode

  setElementText: (node: HostNode, text: string) => void

  insert: (child: HostNode, parent: HostNode, anchor?: HostNode | null) => void
}
