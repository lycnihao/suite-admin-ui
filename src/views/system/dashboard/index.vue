<template>
  <a-card title="工作台" :bordered="false">
    <div class="flex flex-row">
      <div class="basis-1/2">
        <div class="flex items-center">
          <div>
            <a-avatar circle :size="64" src="/src/assets/logo-thumbnail.svg" />
          </div>
          <div>
            <p class="px-4 text-xl">早安，Ah Liyc，开始您一天的工作吧！</p>
            <p class="px-4 text-gray-400">“路漫漫其修远兮”</p>
          </div>
        </div>
      </div>
      <div class="basis-1/2">
        <div class="flex justify-end w-full">
          <div class="flex flex-1 flex-col justify-center text-right">
            <span class="text-secondary">项目数</span>
            <span class="text-2xl">18</span>
          </div>
          <div class="flex flex-1 flex-col justify-center text-right">
            <span class="text-secondary">代办</span>
            <span class="text-2xl">3/15</span>
          </div>
          <div class="flex flex-1 flex-col justify-center text-right">
            <span class="text-secondary">消息</span>
            <span class="text-2xl">58</span>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts">
export default { name: "dashboard_workplace" };
</script>
