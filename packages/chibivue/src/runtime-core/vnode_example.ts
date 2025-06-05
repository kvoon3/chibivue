/* eslint-disable unused-imports/no-unused-vars */

import type { VNode, VNodeChild } from './vnode'

const node: VNode = {
  type: 'div',
  props: null,
  children:

  // VNodeArrayChildren
  [

    // VNodeChildAtom
    'asdf',

    // VNodeChildAtom
    { type: 'div', props: null, children: 'asdf' },

    // VNodeArrayChildren
    [
      'asdf',
      { type: 'div', props: null, children: 'asdf' },
    ],
  ],
}

const node2: VNodeChild = {
  type: 'div',
  props: null,
  children:

  // VNodeArrayChildren
  [

    // VNodeChildAtom
    'asdf',

    // VNodeChildAtom
    { type: 'div', props: null, children: 'asdf' },

    // VNodeArrayChildren
    [
      'asdf',
      { type: 'div', props: null, children: 'asdf' },
    ],
  ],
}

type TheVNode = string | (string | VNode | (string | VNode)[])[]
