import type { RendererOptions } from './rendererOpts'
import type { VNode } from './vnode'

export type RenderFunction<T> = (vnode: VNode, rootContainer: T) => void

export function createRender<T>(rendererOpts: RendererOptions<T>): { render: RenderFunction<T> } {
  const renderVNode = (vnode: VNode | string): T => {
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

  const render = (vnode: VNode, rootContainer: T): void => {
    rendererOpts.insert(renderVNode(vnode), rootContainer)
  }

  return { render }
}
