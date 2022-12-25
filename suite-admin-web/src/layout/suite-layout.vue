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
        <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SubMenu from './sider-menu.vue'

  const menusList = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    redirect: '/dashboard/console',
    meta: {
      icon: 'dashboard-outlined',
      title: 'Dashboard',
    },
    children: [
      {
        path: 'console',
        name: 'dashboard_console',
        component: '/dashboard/console/console',
        meta: {
          title: '主控台',
        },
      },
      {
        path: 'monitor',
        name: 'dashboard_monitor',
        component: '/dashboard/monitor/monitor',
        meta: {
          title: '监控页',
        },
      },
      {
        path: 'workplace',
        name: 'dashboard_workplace',
        component: '/dashboard/workplace/workplace',
        meta: {
          hidden: true,
          title: '工作台',
        },
      },
    ],
  },
];

  export default defineComponent({
    name: 'SuiteLayout',
    components: {
      'sub-menu': SubMenu,
    },
    setup() {
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
        selectedKeys: ref<string[]>(['1']),
        openKeys: ref(['2']), 
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
  