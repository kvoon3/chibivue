import type { Deps } from './dep'
import { createDeps } from './dep'

// eslint-disable-next-line import/no-mutable-exports
export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(
    public fn: () => T,
  ) {}

  run(): T {
    // 1. save parent
    // ※ 在执行 fn 之前保存 activeEffect，执行后恢复它。
    // 如果不这样做，它将一个接一个地被覆盖并表现出意外行为。（完成后让我们将其恢复到原始状态）
    const parent = activeEffect

    // 2. run effect
    // eslint-disable-next-line ts/no-this-alias
    activeEffect = this
    const res = activeEffect.fn()

    // 3. recover parent
    activeEffect = parent

    return res
  }
}

type TargetMap = WeakMap<object, TargetKeyToDeps>

type TargetKeyToDeps = Map<unknown, Deps>

const targetMap: TargetMap = new WeakMap()

export function track(target: object, key: unknown): void {
  let targetKeyToDeps = targetMap.get(target)
  if (!targetKeyToDeps) {
    targetMap.set(target, (targetKeyToDeps = new Map()))
  }

  let deps = targetKeyToDeps.get(key)
  if (!deps) {
    targetKeyToDeps.set(key, (deps = createDeps()))
  }

  if (activeEffect)
    deps.add(activeEffect)
}

export function trigger(target: object, key: unknown): void {
  const targetKeyDepsMap = targetMap.get(target)
  if (!targetKeyDepsMap)
    return

  const deps = targetKeyDepsMap.get(key)
  if (!deps)
    return

  for (const dep of deps)
    dep.run()
}
