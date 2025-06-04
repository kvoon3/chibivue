import type { ComponentOptions } from '../types'
import type { RenderFunction } from './renderer'
import { ReactiveEffect } from '../reactivity/effect'

// create app core
export function createAppApi<T>(render: RenderFunction<T>) {
  return function createAppCore(rootComponent: ComponentOptions): {
    mount: (rootContainer: any) => void
  } {
    return {
      mount(rootContainer) {
        const componentRenderer = rootComponent.setup?.()

        const updateComponent = (): void => {
          const vnode = componentRenderer?.() // start track target
          if (vnode)
            render(vnode, rootContainer)
        }

        const effect = new ReactiveEffect(updateComponent)
        // 1. parent = activeEffect
        // 2. activeEffect = this // this --> new ReactiveEffect(updateComponent)
        // 3. activeEffect?.fn() // track target when render component, deps <-- updateComponent
        // 4. activeEffect = parent
        effect.run()
      },
    }
  }
}
