import type { VNode, VNodeProps, VNodeTypes } from './vnode'

// hyperscript: create vnode
export function h(
  type: VNodeTypes,
  props: VNodeProps,
  children: (VNode | string)[] | string,
): VNode {
  return {
    type,
    props,
    children,
    el: undefined,
  }
}
