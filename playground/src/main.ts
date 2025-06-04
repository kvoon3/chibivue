import { createApp, h } from 'chibivue'

const app = createApp({
  render: () => h('div', {}, [
    h('p', {}, [
      h('span', {
        style: 'background: #dddddd50; padding: 4px; border-radius: 4px',
        onClick() {
          console.log('clicked')
        },
        onclick() {
          console.log('clicked2')
        },
      }, 'chibivue'),
    ]),
  ]),
})

app.mount('#app')
