import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const configMockPlugin = (isBuild) => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mock",
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';

       setupProdMockServer();
       `,
  });
};

const configHtmlPlugin = (env, isBuild) => {
  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: env.VITE_GLOB_APP_TITLE,
      },
    },
  });
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log("mode:", mode);
  console.log("command:", command);
  console.log("env:", env);
  const VITE_PORT = Number(env.VITE_PORT);
  const isBuild = command === "build";
  return {
    resolve: {
      // 绝对路径重命名：/@/xxxx => src/xxxx
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        {
          find: /^~/,
          replacement: "",
        },
      ],
    },
    // 服务端渲染
    server: {
      host: "0.0.0.0",
      port: VITE_PORT,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve(
              "src/theme/index.less"
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 3000,
    },
    plugins: [vue(), configMockPlugin(isBuild), configHtmlPlugin(env, isBuild)],
  };
};
