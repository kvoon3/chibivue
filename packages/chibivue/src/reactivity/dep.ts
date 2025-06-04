import type { ReactiveEffect } from './effect'

export type Deps = Set<ReactiveEffect>

export function createDeps(effects?: ReactiveEffect[]): Deps {
  const deps = new Set(effects)
  return deps
}
