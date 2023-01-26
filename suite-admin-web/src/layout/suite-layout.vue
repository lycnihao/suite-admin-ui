<template>
  <a-layout>
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', left: 0, top: 0, bottom: 0 }"
      v-model:collapsed="collapsed" :trigger="null" collapsible breakpoint="lg">
      <div class="logo"></div>
      <Menu :theme="theme" :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapsed" />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <MainView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Menu from './sider-menu.vue'
import { useRouter } from 'vue-router';
import MainView from './main-view.vue';

export default defineComponent({
  name: 'SuiteLayout',
  components: {
    Menu,
    MainView
  },
  setup () {
    const router = useRouter();
    const theme = ref('dark')
    const collapsed = ref<boolean>(false);
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const routerRedirect = (path: string) => {
      console.log('redirect:' + path)
      router.replace(path);
    }
    return {
      theme,
      collapsed,
      routerRedirect,
      toggleCollapsed,
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
