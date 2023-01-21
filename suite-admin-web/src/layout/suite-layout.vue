<template>
    <a-layout>
      <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', left: 0, top: 0, bottom: 0 }"
      v-model:collapsed="collapsed" :trigger="null" collapsible breakpoint="lg">
        <div class="logo" ></div>
        <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :theme="theme"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in menusList" :key="item.name">
          <template v-if="!item.children">
            <a-menu-item :key="item.name">
              <template #icon>
                <component v-if="item.meta.icon" :is="item.meta.icon"/>
              </template>
              {{ item.meta.title }}
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :key="item.name" :menu-info="item" />
          </template>
        </template>
      </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="toggleCollapsed"
          />
          <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
        <RouterView>
          <template #default="{ Component, route }">
              <transition name="fade" mode="out-in" appear>
                <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <component v-else :is="Component" :key="route.fullPath" />
              </transition>
            </template>
        </RouterView>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import SubMenu from './sider-menu.vue'
  import { useAsyncRouteStore } from '/@/store/modules/asyncRoute';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'SuiteLayout',
    components: {
      'sub-menu': SubMenu,
    },
    setup() {
      const route = useRoute();
      const asyncRouteStore = useAsyncRouteStore();

      // 需要缓存的路由组件
      const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
      console.log(keepAliveComponents)

      // 获取当前打开的子菜单
      const matched = route.matched;
      const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];
      const menusList = asyncRouteStore.getMenus;
      
      const theme = ref('dark')
      const collapsed = ref<boolean>(false);
      const toggleCollapsed = () => {
        collapsed.value = !collapsed.value;
      };
      return {
        theme,
        menusList,
        collapsed,
        toggleCollapsed,
        selectedKeys: ref<any[]>([ route.name ]),
        openKeys: getOpenKeys,
        keepAliveComponents,
      };
    },
  });
  </script>
  <style>
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .trigger:hover {
    color: #1890ff;
  }
  
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  </style>
  