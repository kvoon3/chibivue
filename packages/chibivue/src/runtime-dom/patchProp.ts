import type { RendererOptions } from '../runtime-core/rendererOpts'

// 1. add all event
// 2. listen event once by bind invoker and patch invoker's value

// NOTE: type: Function & { value: Function }
interface Invoker extends EventListener {
  value: EventValue
}

type EventValue = (e: Event) => void

function addEventListener(
  node: Element,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
): void {
  node.addEventListener(eventName, callback)
}

function removeEventListener(
  node: Element,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
): void {
  node.removeEventListener(eventName, callback)
}

export const patchProp: RendererOptions<Node, Element>['patchProp'] = (node, props) => {
  for (const [key, value] of Object.entries(props)) {
    // is event
    if (key.startsWith('on') && typeof value === 'function') {
      patchEvent(node, key, value)
    }
    // is attr
    else if (typeof value === 'string') {
      patchAttr(node, key, value)
    }
  }
}

function patchEvent(
  node: Element & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null,
): void {
  const invokers = node._vei || (node._vei = {})
  const existingInvoker = invokers[rawName]

  if (value && existingInvoker) {
    // patch
    existingInvoker.value = value
  }
  else {
    const eventName = parseName(rawName)
    if (value) {
      // add
      const invoker = createInvoker(value)

      invokers[rawName] = invoker
      addEventListener(node, eventName, invoker)
    }
    else if (existingInvoker) {
      // remove
      removeEventListener(node, eventName, existingInvoker.value)
      invokers[rawName] = undefined
    }
  }
}

function parseName(key: string): string {
  return key.slice(2).toLocaleLowerCase()
}

function createInvoker(value: EventValue): Invoker {
  const invoker: Invoker = (evt: Event) => {
    invoker.value(evt)
  }
  invoker.value = value
  return invoker
}

function patchAttr(node: Element, key: string, value: string): void {
  node.setAttribute(key, value)
}
