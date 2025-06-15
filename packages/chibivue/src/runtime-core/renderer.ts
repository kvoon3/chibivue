/* eslint-disable ts/no-use-before-define */
import type { RendererOptions } from './rendererOpts'
import type { VNode } from './vnode'
import { normalizeVNode, Text } from './vnode'

export interface RendererNode {
  [key: string]: any
}

export interface RendererElement extends RendererNode {}

export type RenderFunction<HostElement = RendererElement> = (
  vnode: VNode,
  rootContainer: HostElement
) => void

export type PatchFunction = (n1: VNode | null, n2: VNode, container: RendererElement) => void

export function createRender<
  HostNode = RendererNode,
  HostElement = RendererElement,
>(rendererOpts: RendererOptions<HostNode, HostElement>): {
  render: RenderFunction<HostElement>
  patch: PatchFunction
} {
  const renderVNode = (vnode: VNode): HostNode | HostElement => {
    if (typeof vnode === 'string') {
      return rendererOpts.createText(vnode)
    }

    if (vnode.type === Text) {
      return rendererOpts.createText(vnode.children as string)
    }

    const parentNode = rendererOpts.createElement(vnode.type)

    if (vnode.props)
      rendererOpts.patchProp(parentNode, vnode.props)

    for (const item of vnode.children) {
      const node = renderVNode(normalizeVNode(item))
      rendererOpts.insert(node, parentNode)
    }

    return parentNode
  }

  const render = (vnode: VNode, rootContainer: HostElement): void => {
    // TODO [2025-07-01]: no assume rootContainer are having `firstChild` DOM attribute
    // @ts-expect-error type error
    while (rootContainer.firstChild)
      // @ts-expect-error type error
      rootContainer.removeChild(rootContainer.firstChild)

    rendererOpts.insert(renderVNode(vnode), rootContainer)
  }

  const patch = (n1: VNode | null, n2: VNode, container: RendererElement): void => {
    const { type } = n2
    if (type === Text) {
      processText(n1, n2, container)
    }
    else {
      processElement(n1, n2, container)
    }
  }

  const processElement = (n1: VNode | null, n2: VNode, container: RendererElement): void => {
    if (n1 === null) {
      mountElement(n2, container)
    }
    else {
      patchElement(n1, n2)
    }
  }

  const processText = (n1: VNode | null, n2: VNode, container: RendererElement): void => {
    if (n1 === null) {
      // TODO [2025-07-01]: type error between `RendererNode` with `HostNode`
      // @ts-expect-error type error
      rendererOpts.insert((n2.el = rendererOpts.createText(n2.children as string)), container)
    }
    else {
      const el = (n2.el = n1.el)
      rendererOpts.setText(el, n2.children)
    }
  }

  const mountElement = (vnode: VNode, container: RendererElement): void => {
    const { type, props } = vnode

    // TODO [2025-07-01]: type error between `RendererNode` with `HostNode`
    // @ts-expect-error type error
    const el = (vnode.el = rendererOpts.createElement(type as string))

    if (vnode.children) {
      for (let idx = 0; idx < vnode.children.length; idx++) {
        // NOTE: update parent children list is needed
        const child = (vnode.children[idx] = normalizeVNode(vnode.children[idx]))
        // const child = (vnode.children[idx] = normalizeVNode(vnode.children[idx]))

        patch(null, child, el)
      }
    }

    if (props)
      rendererOpts.patchProp(el, props)

    // @ts-expect-error just type error
    rendererOpts.insert(el, container)
  }

  const patchElement = (n1: VNode, n2: VNode): void => {
    const el = (n2.el = n1.el!)

    const { props } = n2

    rendererOpts.patchProp(el, props)

    const c1 = n1.children
    const c2 = n2.children
    for (let idx = 0; idx < c2.length; idx++) {
      // NOTE: update children list is needed
      // c2[idx] may string, need normalized
      const child = (c2[idx] = normalizeVNode(c2[idx]))

      patch(c1[idx], child, el)
    }
  }

  return { render, patch }
}
