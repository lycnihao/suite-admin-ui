<template>
  <a-layout>
    <a-layout-sider class="suite-layout-sider" v-model:collapsed="collapsed"
      :trigger="null" collapsible breakpoint="lg">
      <div class="suite-layout-sider-logo"><img src="../assets/logo.svg" alt="" /></div>
      <Menu :theme="theme" :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="suite-layout-header">
        <menu-unfold-outlined v-if="collapsed" class="suite-layout-header-trigger" @click="toggleCollapsed" />
        <menu-fold-outlined v-else class="suite-layout-header-trigger" @click="toggleCollapsed" />
        <TagsView />
      </a-layout-header>
      <a-layout-content class="suite-layout-content">
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
import TagsView from './tags-view.vue';

export default defineComponent({
  name: 'SuiteLayout',
  components: {
    Menu,
    TagsView,
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
<style lang="less" scoped>
:deep(.ant-layout-header) {
  height: 40px;
  line-height: 45px;
}
.suite-layout-sider {
  overflow: auto;
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;

  &-logo>img {
    padding: 10px 19px 4px;
  }
}

.suite-layout-header {
  background: #fff;
  padding: 0;

  &-trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  &-trigger:hover {
    color: #1890ff;
  }
}

.suite-layout-content {
  margin: 56px 16px 24px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
