<template>
  <a-space :size="18" style="margin-right: 6px">
    <!---消息通知--->
    <div class="message">
      <HeaderMessage ref="headerMessage" />
    </div>
    <!---头像信息--->
    <div class="user-space-item">
      <HeaderAvatar />
    </div>
    <div class="setting">
      <!---设置--->
      <a-button type="text" @click="showSetting" class="operate-icon">
        <template #icon>
          <setting-outlined :style="{ fontSize: '17px' }"
        /></template>
      </a-button>
    </div>
    <HeaderSetting ref="headerSetting" />
  </a-space>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HeaderMessage from "./header-message.vue";
import HeaderSetting from "./header-setting.vue";
import HeaderAvatar from "./header-avatar.vue";
// 设置
const headerSetting = ref();
function showSetting() {
  headerSetting.value.show();
}
</script>
<style lang="less" scoped>
.message {
  padding: 0 10px;
}
.setting {
}
</style>
