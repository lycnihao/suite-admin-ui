<template>
  <a-layout>
    <a-layout-sider
      class="suite-layout-sider"
      v-model:collapsed="collapsed"
      :theme="theme"
      :trigger="null"
      collapsible
      breakpoint="lg"
    >
      <SiderMenu :theme="theme" :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="suite-layout-header">
        <a-row justify="space-between" class="suite-layout-header-user">
          <a-col class="suite-layout-header-left">
            <span class="collapsed-button">
              <menu-unfold-outlined
                v-if="collapsed"
                class="suite-layout-header-trigger"
                @click="toggleCollapsed"
              />
              <menu-fold-outlined
                v-else
                class="suite-layout-header-trigger"
                @click="toggleCollapsed"
              />
            </span>
            <a-tooltip placement="bottom">
              <template #title>刷新</template>
              <span class="home-button" @click="reloadPage">
                <reload-outlined class="trigger" />
              </span>
            </a-tooltip>
            <span class="location-breadcrumb">
              <MenuBreadcrumb v-show="breadCrumbFlag" />
            </span>
          </a-col>
          <!---用戶操作区域-->
          <a-col class="suite-layout-header-right">
            <HeaderUserSpace />
          </a-col>
        </a-row>
        <TagsView v-show="pageTagFlag" />
      </a-layout-header>
      <a-layout-content class="suite-layout-content">
        <MainView />
      </a-layout-content>
      <a-layout-footer class="layout-footer">
        <PageFooter v-show="footerFlag" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, unref, computed } from "vue";
import SiderMenu from "./components/side-menu/index.vue";
import { useRoute, useRouter } from "vue-router";
import MainView from "./main-view.vue";
import TagsView from "./components/page-tag/index.vue";
import MenuBreadcrumb from "./components/breadcrumb-menu/index.vue";
import HeaderUserSpace from "./components/header-user-space/index.vue";
import PageFooter from "./components/page-footer/index.vue";
import { useProjectSettingStore } from "/@/store/modules/projectSetting";

export default defineComponent({
  name: "SuiteLayout",
  components: {
    SiderMenu,
    MenuBreadcrumb,
    HeaderUserSpace,
    TagsView,
    MainView,
    PageFooter,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const collapsed = ref<boolean>(false);
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const routerRedirect = (path: string) => {
      console.log("redirect:" + path);
      router.replace(path);
    };
    // 刷新页面
    const reloadPage = () => {
      router.push({
        path: "?redirect=" + unref(route).fullPath,
      });
    };
    const settingStore = useProjectSettingStore();
    //主题颜色
    const theme = computed(() => settingStore.$state.sideMenuTheme);
    // 是否显示面包屑
    const breadCrumbFlag = computed(() => settingStore.$state.breadCrumbFlag);
    // 是否显示标签页
    const pageTagFlag = computed(() => settingStore.$state.pageTagFlag);
    // 是否显示页脚
    const footerFlag = computed(() => settingStore.$state.footerFlag);
    return {
      theme,
      breadCrumbFlag,
      pageTagFlag,
      footerFlag,
      collapsed,
      routerRedirect,
      toggleCollapsed,
      reloadPage,
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
}

.suite-layout-header {
  background: @component-background;
  padding: 0;

  &-trigger {
    font-size: 18px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  &-trigger:hover {
    color: @link-hover-color;
  }

  .suite-layout-header-user {
    height: @header-user-height;
    // border-bottom: 1px solid #f6f6f6;
  }

  .suite-layout-header-left {
    display: flex;
    height: @header-user-height;

    .collapsed-button {
      line-height: @header-user-height;

      .suite-layout-header-trigger {
        padding: 0 12px;
        font-size: 14px;
      }
    }

    .home-button {
      cursor: pointer;
      padding: 0 5px;
      line-height: @header-user-height;
    }

    .home-button:hover {
      color: @link-hover-color;
    }

    .location-breadcrumb {
      margin-left: 15px;
      line-height: @header-user-height;
    }
  }

  .suite-layout-header-right {
    display: flex;
    height: @header-user-height;
  }
}

.suite-layout-content {
  margin: 56px 16px 0 24px;
  padding: 24px;
  background: @component-background;
  min-height: 280px;
}

.layout-footer {
  position: relative;
  padding: 7px 0px;
  display: flex;
  justify-content: center;
}
</style>
