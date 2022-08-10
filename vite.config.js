import path, { resolve } from 'path'
import { defineConfig, resolveBaseUrl } from 'vite'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@sections': resolve(__dirname, 'src/sections')
    }
  },
  build: {
    outDir: 'built',
    lib: {
      entry: 'src/base/index.js',
      name: 'base'
    },
    publicDir: false,
    rollupOptions: {
      input: {
        'base': 'src/base/index.js'
      },
      output: {
        dir: 'built/assets',
        entryFileNames: '[name].min.js'
      },
      plugins: [
        copy({
          targets: [
            // 按原文件结构复制liquid及json文件
            {
              src: 'src/theme',
              dest: 'built',
              rename: (_name, _extension, fullpath) => {
                const keptParts = fullpath.split(path.sep).filter(dir => {
                  return dir !== 'src' && dir != 'theme'
                })
                return path.join(...keptParts)
              }
            },
            // 复制图片等静态资源文件
            {
              src: 'src/assets/**/*.{svg,jpg,png,otf,ttf,woff}',
              dest: 'built/assets',
              rename: (_name, _extension, fullpath) => {
                const keptParts = fullpath.split(path.sep).filter(dir => {
                  return dir !== 'src' && dir !== 'assets'
                })
                return keptParts.join('-')
              }
            }
          ],
          hook: 'writeBundle'
        })
      ]
    }
  }
})