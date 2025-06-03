import type { Component } from '../types'
import type { RendererOptions } from './renderer'
import { nodeOpts } from '../runtime-dom/renderer'

// render core + DOM (nodeOpts)
// function render<T>(nodeOpts: RendererOptions<T>, rootContainer: T, message: string): void {
//   nodeOpts.setTextContent(rootContainer, message)
// }

// renderer core
type RenderFunction<T> = (rootContainer: T, message: string) => void
// renderer core
export function createRender<T>(rendererOpts: RendererOptions<T>): { render: RenderFunction<T> } {
  const render = (rootContainer: T, message: string): void => {
    rendererOpts.setTextContent(rootContainer, message)
  }

  return { render }
}

// render DOM
const { render } = createRender(nodeOpts)

// create app core
export function createAppApi<T>(render: RenderFunction<T>) {
  return function createAppCore(rootComponent: Component): {
    mount: (rootContainer: any) => void
  } {
    return {
      mount(rootContainer) {
        const message = rootComponent.render()

        render(rootContainer, message) // still rely on render DOM
      },
    }
  }
}

// create app dom
export const createAppDOM = createAppApi(render)
