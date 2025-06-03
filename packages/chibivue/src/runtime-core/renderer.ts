import type { RendererOptions } from './rendererOpts'

export type RenderFunction<T> = (message: string, rootContainer: T) => void

export function createRender<T>(rendererOpts: RendererOptions<T>): { render: RenderFunction<T> } {
  const render = (message: string, rootContainer: T): void => {
    rendererOpts.setTextContent(rootContainer, message)
  }

  return { render }
}
