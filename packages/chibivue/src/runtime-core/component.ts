import type { VNode } from './vnode'

type Component = unknown

export interface ComponentInternalInstance {
  type: Component
  vnode: VNode // it self
  subTree: VNode // n1
  next: VNode // n2
  isMounted: boolean
}

export function createComponentInstance(vnode: VNode): ComponentInternalInstance {
  const type = vnode.type as Component

  const instance: ComponentInternalInstance = {
    type,
    vnode,
    // follow vue.js design
    subTree: null!,
    next: null!,
    isMounted: false,
  }

  return instance
}
