import { defineConfig } from 'tsdown'

defineConfig({
  entry: [
    './src/index',
  ],
  outDir: 'dist',
  dts: true,
  clean: true,
})
