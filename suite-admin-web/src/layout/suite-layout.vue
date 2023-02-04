<template>
  <a-layout>
    <a-layout-sider
      class="suite-layout-sider"
      v-model:collapsed="collapsed"
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
              <template #title>首页</template>
              <span class="home-button" @click="goHome">
                <home-outlined class="trigger" />
              </span>
            </a-tooltip>
            <span class="location-breadcrumb">
              <MenuBreadcrumb />
            </span>
          </a-col>
          <!---用戶操作区域-->
          <a-col class="suite-layout-header-right">
            <HeaderUserSpace />
          </a-col>
        </a-row>
        <TagsView />
      </a-layout-header>
      <a-layout-content class="suite-layout-content">
        <MainView />
      </a-layout-content>
      <a-layout-footer class="layout-footer">
        <PageFooter/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SiderMenu from "./components/side-menu/index.vue";
import { useRouter } from "vue-router";
import MainView from "./main-view.vue";
import TagsView from "./components/page-tag/index.vue";
import MenuBreadcrumb from "./components/breadcrumb-menu/index.vue";
import HeaderUserSpace from "./components/header-user-space/index.vue";
import PageFooter from "./components/page-footer/index.vue";
import { PageEnum } from "/@/enums/pageEnum";

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
    const router = useRouter();
    const theme = ref("dark");
    const collapsed = ref<boolean>(false);
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const routerRedirect = (path: string) => {
      console.log("redirect:" + path);
      router.replace(path);
    };
    return {
      theme,
      collapsed,
      routerRedirect,
      toggleCollapsed,
      goHome: () => routerRedirect(PageEnum.BASE_HOME),
    };
  },
});
</script>
<style lang="less" scoped>
@header-user-height: 40px;

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

  .suite-layout-header-user {
    height: @header-user-height;
    border-bottom: 1px solid #f6f6f6;
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
      background-color: #efefef;
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
  background: #fff;
  min-height: 280px;
}

.layout-footer {
  position: relative;
  padding: 7px 0px;
  display: flex;
  justify-content: center;
}
</style>
