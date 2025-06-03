export interface App {
  mount: (selector: string) => void
}

export interface Component {
  render: () => string
}
