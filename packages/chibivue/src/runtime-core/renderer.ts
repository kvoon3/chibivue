export interface RendererOptions<T> {
  setTextContent: (node: T, text: string) => void
}
