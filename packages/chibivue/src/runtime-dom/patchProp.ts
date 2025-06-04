/* eslint-disable unused-imports/no-unused-vars */

import type { RendererOptions } from '../runtime-core/rendererOpts'

// 1. add all event
// 2. listen event once
// 3. use invoke to collect events

function addEventListener(
  node: Node,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
): void {
  node.addEventListener(eventName, callback)
}

function removeEventListener(
  node: Node,
  eventName: string,
  callback: EventListenerOrEventListenerObject,
): void {
  node.removeEventListener(eventName, callback)
}

export const patchProp: RendererOptions<Node>['patchProp'] = (node, props) => {
  for (const [key, value] of Object.entries(props)) {
    // is event
    if (key.startsWith('on') && typeof value === 'function') {
      patchEvent(node, key, value)
    }
    // is attr
    else if (typeof value === 'string') {
      // TODO: type
      patchAttr(node as Element, key, value)
    }
  }
}

function patchEvent(
  node: Node & { _vei?: Record<string, EventListener | undefined> },
  rawName: string,
  value?: (() => void),
): void {
  const invokers = node._vei || (node._vei = {})
  const existingInvoker = invokers[rawName]

  if (value && existingInvoker) {
    // TODO: patch
  }
  else {
    if (value) {
      // TODO: add
    }
    else {
      // TODO: delete
    }
  }
}

function parseEvent(key: string): string {
  return key.slice(2).toLowerCase()
}

function patchAttr(node: Element, key: string, value: string): void {
  node.setAttribute(key, value)
}
