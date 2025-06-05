import type { VNode, VNodeProps } from './vnode'

// hyperscript: create vnode
export function h(
  type: string,
  props: VNodeProps,
  children: (VNode | string)[] | string,
): VNode {
  return {
    type,
    props,
    children,
  }
}
