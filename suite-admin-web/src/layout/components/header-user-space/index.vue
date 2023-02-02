<template>
  <a-space :size="10">
    <!---头像信息--->
    <div class="user-space-item">
      <HeaderAvatar />
    </div>
  </a-space>
</template>
<script setup lang="ts">
import HeaderAvatar from "./header-avatar.vue";
</script>
