import vue from "@vitejs/plugin-vue";
import type { Plugin, PluginOption } from "vite";
import { configHtmlPlugin } from "./html";
import { configMockPlugin } from "./mock";

export function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild: boolean
) {
  const useMock = viteEnv.VITE_USE_MOCK && viteEnv.VITE_USE_MOCK == "true";
  const vitePlugins: (Plugin | PluginOption[])[] = [
    // have to
    vue(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-mock
  useMock && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}
