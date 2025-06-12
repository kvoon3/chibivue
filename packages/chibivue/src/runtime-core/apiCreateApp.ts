import type { ComponentOptions } from '../types'
import type { PatchFunction, RenderFunction } from './renderer'
import type { VNode } from './vnode'
import { ReactiveEffect } from '../reactivity/effect'

// create app core
export function createAppApi<T>(
  _render: RenderFunction<T>,
  patch: PatchFunction,
) {
  return function createAppCore(rootComponent: ComponentOptions): {
    mount: (rootContainer: any) => void
  } {
    return {
      mount(rootContainer) {
        const componentRenderer = rootComponent.setup?.()

        // eslint-disable-next-line prefer-const
        let n1: VNode | null = null

        const updateComponent = (): void => {
          const n2 = componentRenderer?.() // start track target
          if (n2)
            patch(n1, n2, rootContainer)
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
