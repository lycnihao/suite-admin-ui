import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
import pkg from "./package.json";

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const configMockPlugin = (command) => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mock",
    localEnabled: command === "serve",
    prodEnabled: command !== "serve",
    injectCode: `
       import { setupProdMockServer } from './mock/_createProductionServer';

       setupProdMockServer();
       `,
  });
};

const configHtmlPlugin = (env, isBuild) => {
  const VITE_PUBLIC_PATH = "/";

  const path = VITE_PUBLIC_PATH.endsWith("/")
    ? VITE_PUBLIC_PATH
    : `${VITE_PUBLIC_PATH}/`;
  const getAppConfigSrc = () => {
    return `${path || "/"}app.config.js?v=${
      pkg.version
    }-${new Date().getTime()}`;
  };

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: env.VITE_GLOB_APP_TITLE,
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
            {
              tag: "script",
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log("启动模式:" + mode);
  console.log("环境变量:", env);
  return {
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
      port: Number(env.VITE_PORT),
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
    plugins: [vue(), configMockPlugin(command), configHtmlPlugin(env, false)],
  };
};
