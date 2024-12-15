import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import banner from './banner.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BUNDLE = process.env.BUNDLE === 'true'
const ESM = process.env.ESM === 'true'

let destinationFile = `Harmoniq${ESM ? '.esm' : ''}`
const plugins = [
  babel({
    // Only transpile our source code
    exclude: 'node_modules/**',
    // Include the helpers in the bundle, at most one copy of each
    babelHelpers: 'bundled',
  }),
]

const rollupConfig = {
  input: path.resolve(__dirname, `../src/Harmoniq.js`),
  output: {
    banner: banner(),
    file: path.resolve(__dirname, `../dist/js/${destinationFile}.js`),
    format: ESM ? 'esm' : 'umd',
    generatedCode: 'es2015',
  },
  plugins,
}

if (!ESM) {
  rollupConfig.output.name = 'Harmoniq'
}

export default rollupConfig
