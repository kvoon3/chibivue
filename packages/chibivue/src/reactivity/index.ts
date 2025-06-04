interface Target {
  [key: string | symbol]: any
}

export function reactive(target: Target): Target {
  return new Proxy(target, {
    get(target, key) {
      // eslint-disable-next-line no-console
      console.log(`read: ${String(key)}`, target[key])
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      // eslint-disable-next-line no-console
      console.log(`write: ${String(key)}`, target[key])
      return true
    },
  })
}
