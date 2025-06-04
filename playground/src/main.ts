import { createApp, h, reactive } from 'chibivue'

const app = createApp({
  setup() {
    const project = reactive({
      name: 'chibivue',
      desc: 'WIP',
    })

    console.log('project.name', project.name)
    project.desc = 'a minimal vue implement'

    return () => h('div', {}, [
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
    ])
  },
})

app.mount('#app')
