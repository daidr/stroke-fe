<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { changeSystemUserPassword } from '@/api/system/auth'
import { useMessage } from '@/components/Message'
const router = useRouter()
const oldPassword = ref('')
const newPassword = ref('')
const repeatPassword = ref('')

const isLoading = ref(false)

const { error, success } = useMessage()

const changepw = async () => {
  if (!oldPassword.value || !newPassword.value || !repeatPassword.value) {
    error('密码不能为空')
    return
  }
  if (newPassword.value != repeatPassword.value) {
    error('两次输入的密码不一致')
    return
  }

  isLoading.value = true

  const result = await changeSystemUserPassword(oldPassword.value, newPassword.value)
  if (result) {
    router.push('/admin/home')
    success('密码修改成功')
  }
  isLoading.value = false
}
</script>

<template>
  <div class="changepw-wrapper">
    <div class="title">修改密码</div>
    <div class="form" :class="{ loading: isLoading }">
      <input
        v-model="oldPassword"
        type="password"
        autocomplete="current-password"
        placeholder="现在的密码"
      />
      <input
        v-model="newPassword"
        type="password"
        autocomplete="new-password"
        placeholder="新密码"
      />
      <input
        v-model="repeatPassword"
        type="password"
        autocomplete="repeat-password"
        placeholder="重复新密码"
      />
      <div class="actions">
        <div></div>
        <div class="changepw-btn" @click="changepw">修改密码</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.changepw-wrapper {
  @apply fixed top-15 left-0 right-0 bottom-0;
  @apply flex items-center justify-center flex-col;
  @apply space-y-10;

  .title {
    @apply text-3xl font-light select-none relative;

    &:after {
      content: '管理面板';
      @apply text-sm font-light absolute right-0 -bottom-1.1em whitespace-nowrap;
    }
  }

  .form {
    @apply flex flex-col space-y-2;

    .actions {
      @apply flex items-center justify-between;

      a {
        @apply text-black/70 dark:text-white/70;
      }
    }

    input {
      @apply px-3 py-2 text-lg bg-transparent;
      @apply border-0 ring-1 ring-black/70 dark:ring-white/70 rounded-md outline-none;
    }

    .changepw-btn {
      @apply px-3 py-2;
      @apply border-0 ring-1 ring-dark/70 dark:ring-white/70 rounded-md text-black/70 dark:text-white/70;
      @apply cursor-pointer;
      @apply transition;
      &:hover {
        @apply bg-black/70 text-white;
        @apply dark:(bg-white/70 text-black);
      }
      &:active {
        @apply opacity-80;
      }
    }

    &.loading {
      @apply opacity-50 pointer-events-none;
    }
  }
}
</style>
