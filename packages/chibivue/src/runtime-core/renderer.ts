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
    if (type === Text)
      processText(n1, n2, container)
    else
      processElement(n1, n2, container)
  }

  const processElement = (n1: VNode | null, n2: VNode, container: RendererElement): void => {
    if (n1 === null)
      mountElement(n2, container)
    // else
    //   patchElement(n1, n2)
  }

  const processText = (n1: VNode | null, n2: VNode, container: RendererElement): void => {
    if (n1 === null)
      // TODO [2025-07-01]: type error between `RendererNode` with `HostNode`
      // @ts-expect-error type error
      rendererOpts.insert((n2.el = rendererOpts.createText(n2.children as string)), container)
    // else
    //   patchText(n1, n2)
  }

  const mountElement = (vnode: VNode, container: RendererElement): void => {
    const { type, props } = vnode

    // TODO [2025-07-01]: type error between `RendererNode` with `HostNode`
    // @ts-expect-error type error
    const el = vnode.el = rendererOpts.createElement(type as string)

    if (props)
      rendererOpts.patchProp(el, props)

    if (vnode.children) {
      for (const child of vnode.children) {
        // TODO [2025-07-01]: type error between `RendererNode` with `HostNode`
        // @ts-expect-error type error
        patch(null, normalizeVNode(child), el)
      }
    }

    // @ts-expect-error just type error
    rendererOpts.insert(el, container)
  }

  return { render, patch }
}
