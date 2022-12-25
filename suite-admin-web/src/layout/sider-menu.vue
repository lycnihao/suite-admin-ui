<template>
    <a-sub-menu :key="menuInfo.name">
      <template #icon><component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon"/></template>
      <template #title>{{ menuInfo.meta.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <template #icon>
                <component v-if="item.meta.icon" :is="item.meta.icon"/>
                {{ item.meta.icon }}
            </template>
            {{ item.meta.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.name" />
        </template>
      </template>
    </a-sub-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SubMenu',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
    }
})
</script>