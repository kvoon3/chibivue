import type { RendererOptions } from '../runtime-core/rendererOpts'

// 1. add all event
// 2. listen event once by bind invoker and patch invoker's value

// NOTE: type: Function & { value: Function }
interface Invoker extends EventListener {
  value: EventValue
}

type EventValue = (e: Event) => void

function addEventListener(
  el: Element,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
): void {
  el.addEventListener(eventName, callback)
}

function removeEventListener(
  el: Element,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
): void {
  el.removeEventListener(eventName, callback)
}

export const patchProp: RendererOptions<Node, Element>['patchProp'] = (el, props) => {
  for (const [key, value] of Object.entries(props)) {
    // is event
    if (key.startsWith('on') && typeof value === 'function') {
      patchEvent(el, key, value)
    }
    // is attr
    else if (typeof value === 'string') {
      patchAttr(el, key, value)
    }
  }
}

function patchEvent(
  el: Element & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null,
): void {
  const invokers = el._vei || (el._vei = {})
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
      addEventListener(el, eventName, invoker)
    }
    else if (existingInvoker) {
      // remove
      removeEventListener(el, eventName, existingInvoker.value)
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

function patchAttr(el: Element, key: string, value: any): void {
  if (value === null)
    el.removeAttribute(key)
  else
    el.setAttribute(key, value)
}
