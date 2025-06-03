interface Component {
  render: () => string
}

interface App {
  mount: (selector: string) => void
}

export function createApp(options: Component): App {
  return {
    mount(selector) {
      const rootContainer = document.querySelector(selector)
      if (!rootContainer)
        return

      rootContainer.textContent = options.render()
    },
  }
}
