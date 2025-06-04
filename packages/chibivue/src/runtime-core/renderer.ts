import type { RendererOptions } from './rendererOpts'
import type { VNode } from './vnode'

export interface RendererNode {
  [key: string]: any
}

export interface RendererElement extends RendererNode {}

export type RenderFunction<HostElement = RendererElement> = (
  vnode: VNode,
  rootContainer: HostElement
) => void

export function createRender<
  HostNode = RendererNode,
  HostElement = RendererElement,
>(rendererOpts: RendererOptions<HostNode, HostElement>): { render: RenderFunction<HostElement> } {
  const renderVNode = (vnode: VNode | string): HostNode | HostElement => {
    if (typeof vnode === 'string')
      return rendererOpts.createText(vnode)

    const parentNode = rendererOpts.createElement(vnode.type)

    rendererOpts.patchProp(parentNode, vnode.props)

    for (const item of vnode.child) {
      const node = renderVNode(item)
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

  return { render }
}
