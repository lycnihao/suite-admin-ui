<template>
  <a-space :size="10" style="margin-right: 6px">
    <!---头像信息--->
    <div class="user-space-item">
      <HeaderAvatar />
    </div>
    <div class="setting">
      <!---设置--->
      <a-button type="text" @click="showSetting" class="operate-icon">
        <template #icon><setting-outlined /></template>
      </a-button>
    </div>
    <HeaderSetting ref="headerSetting" />
  </a-space>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeaderSetting from "./header-setting.vue";
import HeaderAvatar from "./header-avatar.vue";
// 设置
const headerSetting = ref();
function showSetting() {
  headerSetting.value.show();
}
</script>
<style lang="less" scoped>
.setting {
  height: @header-user-height;
  line-height: @header-user-height;
  vertical-align: middle;
  display: flex;
  align-items: center;
}
</style>
