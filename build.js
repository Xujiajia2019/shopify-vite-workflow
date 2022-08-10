import path, { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import { build } from 'vite';

// libraries
const libraries = [
  {
    lib: {
      entry: 'src/base/index.js',
      name: 'base',
      formats: ['umd']
    },
    // excute once, so no need to copy
    copy: {
      targets: [
        // copy liquid or json according to shopify architecture
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
        // copy assets and rename
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
    }
  },
  // If you need to introduce js in section
  {
    lib: {
      entry: 'src/sections/product/index.js',
      name: 'product',
      formats: ['umd']
    }
  }
];

// build
libraries.forEach(async (libItem) => {
  await build({
    configFile: false,
    build: {
      outDir: 'built',
      lib: libItem.lib,
      emptyOutDir: false,
      publicDir: false,
      rollupOptions: {
        input: libItem.input,
        output: {
          dir: 'built/assets',
          entryFileNames: `${libItem.lib.name}.min.js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return `${libItem.lib.name}.min.css`
            }
            return `${assetInfo.name}.min.css`
          }
        },
        plugins: [
          copy(libItem.copy)
        ]
      }
    }
  });
});
