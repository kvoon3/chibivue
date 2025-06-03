export interface VNode {
  type: string
  props: VNodeProps
  child: VNode[] | string
}

export interface VNodeProps {
  [key: string]: (() => void) | string
}
