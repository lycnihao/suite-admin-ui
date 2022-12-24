import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 绝对路径重命名：/@/xxxx => src/xxxx
    alias: [
      // 国际化替换
      // {
      //   find: 'vue-i18n',
      //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      // },
      // 绝对路径重命名：/@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  // 服务端渲染
  server: {
    host: '0.0.0.0',
    port: 8001,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/theme/index.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [vue()],
})
