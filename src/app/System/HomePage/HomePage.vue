<script setup lang="ts">
import { useMessage } from '@/components/Message'

import { RouterLink, RouterView } from 'vue-router'

const menuList = [
  { path: '/diagnose', name: '诊断管理' },
  { path: '/patient', name: '患者管理' },
  { path: '/doctor', name: '医生管理' },
  { path: '/record', name: '病历管理' },
  { path: '/plan', name: '方案管理' },
  { path: '/treatment', name: '治疗管理' }
]
</script>

<template>
  <div class="home-wrapper">
    <div class="split-view">
      <div class="left flex flex-col">
        <RouterLink
          v-for="menu of menuList"
          :key="menu.path"
          class="link-item"
          :to="`/admin${menu.path}`"
        >
          {{ menu.name }}
        </RouterLink>
      </div>
      <div class="right">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-wrapper {
  @apply fixed top-15 left-0 right-0 bottom-0;
  @apply flex justify-center;

  .link-item {
    @apply p-2 px-4 text-xl font-light;
    @apply cursor-pointer select-none;

    &:hover {
      @apply bg-zinc/10;
    }

    &.router-link-exact-active {
      @apply bg-zinc/20 pointer-events-none;
    }
  }

  .refresh-btn {
    @apply cursor-pointer ml-2;
    @apply transition-colors p-0.5 rounded-md;

    &:hover {
      @apply bg-zinc/20;
    }

    &:active {
      @apply bg-zinc/30;
    }
  }

  .split-view {
    @apply flex h-full max-w-1400px w-full;

    .left {
      @apply border-zinc/50 border-l-1 border-l-solid w-160px h-full;
    }
    .right {
      @apply border-zinc/50 border-l-1 border-l-solid border-r-1 border-r-solid flex-grow h-full;
    }
  }
}
</style>
