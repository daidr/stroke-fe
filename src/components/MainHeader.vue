<script setup lang="ts">
import { useDoctorStore } from '@/stores/doctor'
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import DarkModeMonitor from '@/components/DarkModeMonitor.vue'
import { useSystemStore } from '@/stores/system'
import { useMessage } from './Message'

const doctorStore = useDoctorStore()
const systemStore = useSystemStore()

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

const route = useRoute()
const { success, error } = useMessage()

const isInAdmin = computed(() => {
  return route.path.startsWith('/admin')
})

const copyString = (str: string) => {
  if (!navigator.clipboard) {
    error('浏览器不支持复制')
    return
  }
  navigator.clipboard.writeText(str)
  success('复制成功')
}

const stringEllipsis = (str: string, length: number) => {
  // 长于 20个字符，在中间截断，用...代替
  if (str.length > length) {
    return str.slice(0, length / 2) + '...' + str.slice(-length / 2)
  }
}
</script>

<template>
  <header>
    <template v-if="isInAdmin">
      <RouterLink to="/admin" class="decoration-none">
        <div class="logo-with-text">
          <div class="logo"></div>
          <span class="logo-text">Stroke 管理面板</span>
        </div>
      </RouterLink>
    </template>
    <template v-else>
      <RouterLink to="/" class="decoration-none">
        <div class="logo-with-text">
          <div class="logo"></div>
          <span class="logo-text">Stroke</span>
        </div>
      </RouterLink>
    </template>
    <template v-if="isInAdmin">
      <div class="flex items-center space-x-2">
        <div v-if="systemStore.isLoggedIn" class="user-info">
          <div class="user-popover">
            <span @pointerenter="onPointerEnter" @pointerleave="onPointerLeave">{{
              systemStore.system.username
            }}</span>
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
                  <div>用户名：{{ systemStore.system.username }}</div>
                  <div class="flex items-center">
                    Token：{{ stringEllipsis(systemStore.system.token, 10) }}
                    <div
                      class="copy-btn"
                      @click="
                        () => {
                          copyString(systemStore.system.token)
                        }
                      "
                    >
                      <div class="i-mingcute-copy-fill"></div>
                    </div>
                  </div>
                  <RouterLink class="btn" to="/admin/changepw">
                    <div class="i-mingcute-key-2-line"></div>
                    修改密码
                  </RouterLink>
                  <div class="btn" @click="systemStore.logout">
                    <div class="i-mingcute-align-arrow-left-line"></div>
                    退出登录
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <DarkModeMonitor />
      </div>
    </template>
    <template v-else>
      <div class="flex items-center space-x-2">
        <div v-if="doctorStore.isLoggedIn" class="user-info">
          <div class="user-popover">
            <span @pointerenter="onPointerEnter" @pointerleave="onPointerLeave">{{
              doctorStore.doctor.name
            }}</span>
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
                  <RouterLink class="btn" to="/changepw">
                    <div class="i-mingcute-key-2-line"></div>
                    修改密码
                  </RouterLink>
                  <div class="btn" @click="doctorStore.logout">
                    <div class="i-mingcute-align-arrow-left-line"></div>
                    退出登录
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <DarkModeMonitor />
      </div>
    </template>
  </header>
</template>

<style scoped lang="scss">
header {
  @apply w-full h-15 ring-1 ring-zinc/30;
  @apply flex items-center px-5 justify-between;

  .copy-btn {
    @apply ml-1 p-1 cursor-pointer rounded text-black/50 dark:text-white/50;

    &:hover {
      @apply bg-zinc/20;
    }

    &:active {
      @apply bg-zinc/30;
    }
  }

  .logo-with-text {
    @apply flex items-center space-x-2 select-none text-black dark:text-white;
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
      @apply bg-white dark:bg-black ring-1 ring-zinc/50 shadow-lg shadow-black/10 rounded-md;

      .btn {
        @apply py-1 select-none cursor-pointer text-black dark:text-white decoration-none;
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
