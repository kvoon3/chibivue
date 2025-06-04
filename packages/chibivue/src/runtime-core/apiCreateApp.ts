import type { ComponentOptions } from '../types'
import type { RenderFunction } from './renderer'

// create app core
export function createAppApi<T>(render: RenderFunction<T>) {
  return function createAppCore(rootComponent: ComponentOptions): {
    mount: (rootContainer: any) => void
  } {
    return {
      mount(rootContainer) {
        const componentRenderer = rootComponent.setup?.()

        const updateComponent = (): void => {
          const vnode = componentRenderer?.()
          if (vnode)
            render(vnode, rootContainer)
        }

        updateComponent()
      },
    }
  }
}
