import path from 'node:path'

import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import packageInfo from './package.json'

const externalDependenciesRegExrs = [
  ...Object.keys(packageInfo.dependencies),
  ...Object.keys(packageInfo?.peerDependencies ?? {}),
].map((name) => new RegExp(`^${name}(/.*)?(?<!\\.css)$`))

export default defineConfig({
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      fileName: '[name]',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: (id) => {
        if (id === 'react/jsx-runtime') return false
        return externalDependenciesRegExrs.some((regex) => regex.test(id))
      },
      plugins: [
        babel({
          babelHelpers: 'runtime',
          skipPreflightCheck: true,
          exclude: ['node_modules/**'],
          extensions: ['.ts', '.tsx'],
        }),
        getBabelOutputPlugin({
          allowAllFormats: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  chrome: 50,
                  safari: 12,
                },
                useBuiltIns: 'usage',
                corejs: {
                  version: 3,
                },
              },
            ],
          ],
          plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
        }),
      ],
    },
    sourcemap: true,
  },
  plugins: [react()],
  publicDir: false,
})
