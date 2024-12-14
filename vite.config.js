import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './example',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'styles'),
      '@dist': resolve(__dirname, 'dist'),
    },
  },
  build: {
    outDir: '../dist',
  },
  publicDir: '../public',
})
