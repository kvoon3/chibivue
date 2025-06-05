export interface VNode {
  type: string
  props: VNodeProps
  children: (VNode | string)[] | string
}

export interface VNodeProps {
  [key: string]: (() => void) | string
}
