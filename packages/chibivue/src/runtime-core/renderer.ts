export interface RendererOptions<T = any> {
  setTextContent: (node: T, text: string) => void
}

export type RenderFunction<T> = (rootContainer: T, message: string) => void

export function createRender<T>(rendererOpts: RendererOptions<T>): { render: RenderFunction<T> } {
  const render = (rootContainer: T, message: string): void => {
    rendererOpts.setTextContent(rootContainer, message)
  }

  return { render }
}
