import type { VNode } from './runtime-core/vnode'

export interface App {
  mount: (selector: string) => void
}

export interface ComponentOptions {
  render?: () => VNode
  setup?: () => () => VNode
}
