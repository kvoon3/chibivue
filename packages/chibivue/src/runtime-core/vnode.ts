import type { RendererNode } from './renderer'

export const Text: unique symbol = Symbol('text')

export type VNodeTypes = string | typeof Text

export interface VNode {
  type: VNodeTypes
  props: VNodeProps | null
  children: VNodeNormailzedChildren
  el: RendererNode | null
}

export interface VNodeProps {
  [key: string]: (() => void) | string
}

// ATTENTION: only used to export
export type VNodeChild = VNodeAtom | VNodeArrayChildren

export type VNodeNormailzedChildren = string | VNodeArrayChildren
type VNodeArrayChildren = Array<VNodeAtom | VNodeArrayChildren>
type VNodeAtom = VNode | string

export function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null,
  children: string,
): VNode {
  const vnode: VNode = { type, props: props || {}, children, el: null }
  return vnode
}

export function normalizeVNode(child: VNodeChild): VNode {
  if (typeof child === 'object') {
    return { ...child } as VNode
  }
  else {
    const res = createVNode(Text, null, String(child))
    return res
  }
}
