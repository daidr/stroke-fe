<script setup lang="ts">
import { useDoctorStore } from '@/stores/doctor'
import { ref } from 'vue'
const doctorStore = useDoctorStore()

const isPopoverShown = ref(false)

let timer: number

const onPointerEnter = () => {
  window.clearTimeout(timer)
  isPopoverShown.value = true
}

const onPointerLeave = () => {
  timer = window.setTimeout(() => {
    isPopoverShown.value = false
  }, 100)
}
</script>

<template>
  <header>
    <div class="logo-with-text">
      <div class="logo"></div>
      <span class="logo-text">Stroke</span>
    </div>

    <div v-if="doctorStore.isLoggedIn" class="user-info">
      <div class="user-popover">
        <span @pointerenter="onPointerEnter" @pointerleave="onPointerLeave">{{ doctorStore.doctor.name }}</span>
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <div
            v-if="isPopoverShown"
            class="user-panel"
            @pointerenter="onPointerEnter"
            @pointerleave="onPointerLeave"
          >
            <div class="flex flex-col space-y-2 p-2">
              <div>用户名：{{ doctorStore.doctor.username }}</div>
              <div>ID：{{ doctorStore.doctor.id }}</div>
              <div class="logout-btn" @click="doctorStore.logout">
                <div class="i-mingcute-align-arrow-left-line"></div>
                退出登录
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  @apply w-full h-15 ring-1 ring-zinc/30;
  @apply flex items-center px-5 justify-between;

  .logo-with-text {
    @apply flex items-center space-x-2;
    .logo {
      @apply h-10 w-10 bg-gray;
    }

    .logo-text {
      @apply text-lg font-bold;
    }
  }

  .user-popover {
    @apply relative;

    .user-panel {
      @apply absolute z-10 top-8 right-0 whitespace-nowrap min-w-40;
      @apply bg-white ring-1 ring-zinc/50 shadow-lg shadow-black/10 rounded-md;

      .logout-btn {
        @apply py-1 select-none cursor-pointer;
        @apply flex items-center justify-center;
        @apply rounded-md;
        @apply transition;

        &:hover {
          @apply bg-zinc/20;
        }

        &:active {
          @apply bg-zinc/30;
        }
      }
    }
  }
}
</style>
