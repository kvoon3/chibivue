export interface RendererOptions<T = any> {
  setTextContent: (node: T, text: string) => void
}
