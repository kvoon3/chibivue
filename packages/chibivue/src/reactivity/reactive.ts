import { track, trigger } from './effect'

interface Target {
  [key: string | symbol]: any
}

export function reactive(target: Target): Target {
  return new Proxy(target, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    },
  })
}
