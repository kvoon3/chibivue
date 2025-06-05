export interface VNode {
  type: string
  props: VNodeProps | null
  children: VNodeNormailzedChildren
}

export interface VNodeProps {
  [key: string]: (() => void) | string
}

// ATTENTION: only used to export
export type VNodeChild = VNodeAtom | VNodeChildrenArray

export type VNodeNormailzedChildren = string | VNodeChildrenArray
type VNodeChildrenArray = Array<VNodeAtom | VNodeChildrenArray>
type VNodeAtom = VNode | string

export function createVNode(
  type: string,
  props: VNodeProps | null,
  _children: unknown,
): VNode {
  const vnode: VNode = { type, props: props || {}, children: [] }
  return vnode
}
