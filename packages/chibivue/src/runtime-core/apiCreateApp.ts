import type { Component } from '../types'
import type { RenderFunction } from './renderer'

// create app core
export function createAppApi<T>(render: RenderFunction<T>) {
  return function createAppCore(rootComponent: Component): {
    mount: (rootContainer: any) => void
  } {
    return {
      mount(rootContainer) {
        const message = rootComponent.render()

        render(message, rootContainer) // still rely on render DOM
      },
    }
  }
}
