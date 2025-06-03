import { createApp, h } from 'chibivue'

const app = createApp({
  render: () => h('div', {}, [
    h('p', {}, [
      h('span', {}, 'chibivue'),
    ]),
  ]),
})

app.mount('#app')
