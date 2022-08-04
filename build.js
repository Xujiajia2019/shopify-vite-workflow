import path, { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import { build } from 'vite';

// libraries
const libraries = [
  {
    entry: 'src/base/index.js',
    name: 'base',
    fileName: 'base.min',
    formats: ['umd']
  },
  {
    entry: 'src/sections/footer/index.js',
    name: 'footer',
    fileName: 'footer.min',
    formats: ['umd']
  }
];

// const configFirst =
//   {
//     configFile: false,
//     build: {
//       outDir: 'built',
//       lib: libItem,
//       emptyOutDir: false,
//       publicDir: false,
//       plugins: [
//         copy({
//           targets: [
//             // 按原文件结构复制liquid及json文件
//             {
//               src: 'src/theme',
//               dest: 'built',
//               rename: (_name, _extension, fullpath) => {
//                 const keptParts = fullpath.split(path.sep).filter(dir => {
//                   return dir !== 'src' && dir != 'theme'
//                 })
//                 return path.join(...keptParts)
//               }
//             },
//             // 复制图片等静态资源文件
//             {
//               src: 'src/assets/**/*.{svg,jpg,png,otf,ttf,woff}',
//               dest: 'built/assets',
//               rename: (_name, _extension, fullpath) => {
//                 const keptParts = fullpath.split(path.sep).filter(dir => {
//                   return dir !== 'src' && dir !== 'assets'
//                 })
//                 return keptParts.join('-')
//               }
//             }
//           ],
//           hook: 'writeBundle'
//         })
//       ]
//     }
//   }

// const configDefault = {
//   configFile: false,
//   build: {
//     outDir: 'built',
//     lib: libItem,
//     emptyOutDir: false,
//     publicDir: false
//   }
// }



// build
libraries.forEach(async (libItem) => {
  const inputName = libItem.name
  const inputEntry = libItem.entry
  console.log(inputName, inputEntry)
  await build({
    configFile: false,
    build: {
      outDir: 'built',
      lib: libItem,
      emptyOutDir: false,
      publicDir: false,
      rollupOptions: {
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
  });
});
