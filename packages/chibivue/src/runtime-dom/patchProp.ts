import type { RendererOptions } from '../runtime-core/rendererOpts'
import { patchAttr } from './modules/patchAttr'
import { patchEvent } from './modules/patchEvent'

const onRE = /^on[^a-z]/
const isOn = (name: string): boolean => onRE.test(name)

export const patchProp: RendererOptions<Node, Element>['patchProp'] = (el, props) => {
  for (const [key, value] of Object.entries(props)) {
    // is event
    if (isOn(key) && typeof value === 'function') {
      patchEvent(el, key, value)
    }
    // is attr
    else {
      patchAttr(el, key, value)
    }
  }
}
