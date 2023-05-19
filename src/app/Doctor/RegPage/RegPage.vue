<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { regDoctor } from '@/api/doctor/auth'
import { useMessage } from '@/components/Message'
const router = useRouter()
const name = ref('')
const username = ref('')
const password = ref('')
const rpassword = ref('')
const id = ref()

const isLoading = ref(false)

const message = useMessage()

const reg = async () => {
  if (password.value !== rpassword.value) {
    message.error('两次密码不一致')
    return
  }
  isLoading.value = true
  const result = await regDoctor(username.value, password.value, name.value, id.value)
  if (result) {
    message.success('注册完成，请联系管理员激活后登录')
    router.push('/login')
  }
  isLoading.value = false
}
</script>

<template>
  <div class="login-wrapper">
    <div class="logo-with-text">
      <div class="logo"></div>
      <span class="logo-text"> Stroke </span>
    </div>
    <div class="form">
      <input v-model="username" type="text" placeholder="用户名" />
      <input v-model="name" type="text" placeholder="姓名" />
      <input v-model="id" type="text" placeholder="ID" />
      <input v-model="password" type="password" placeholder="密码" />
      <input v-model="rpassword" type="password" placeholder="重复密码" />
      <div class="actions">
        <RouterLink to="/login">前往登录</RouterLink>
        <div class="reg-btn" @click="reg">注册</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-wrapper {
  @apply fixed top-0 left-0 right-0 bottom-0;
  @apply flex items-center justify-center flex-col;
  @apply space-y-10;

  .logo-with-text {
    @apply flex flex-col items-center space-y-5;

    .logo {
      @apply bg-gray;
      @apply w-25 h-25 sm:(w-30 h-30);
    }

    .logo-text {
      @apply text-4xl sm:text-5xl font-extrabold;
    }
  }

  .form {
    @apply flex flex-col space-y-2;

    .actions {
      @apply flex items-center justify-between;

      a {
        @apply text-dark/70;
      }
    }

    input {
      @apply px-3 py-2 text-lg;
      @apply border-0 ring-1 ring-dark/70 rounded-md outline-none;
    }

    .reg-btn {
      @apply px-3 py-2;
      @apply border-0 ring-1 ring-dark/70 rounded-md text-dark/70;
      @apply cursor-pointer;
      @apply transition;
      &:hover {
        @apply bg-dark/70 text-white;
      }
      &:active {
        @apply opacity-80;
      }
    }
  }
}
</style>
