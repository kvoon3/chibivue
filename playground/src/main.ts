import { createApp, h, reactive } from 'chibivue'

const app = createApp({
  setup() {
    const state = reactive({ count: 0 })
    const increment = () => {
      state.count++
    }

    return function render() {
      return h('div', { id: 'my-app', class: 'text-center dark:bg-red' }, [
        h('h1', {}, ['chibivue']),
        h('p', {}, [`count: ${state.count}`]),
        h('button', { onClick: increment }, ['increment']),
      ])
    }
  },
})

app.mount('#app')
