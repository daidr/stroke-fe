<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="login-wrapper">
    <div class="logo-with-text">
      <div class="logo"></div>
      <span class="logo-text"> Stroke </span>
    </div>
    <div class="form">
      <input type="text" placeholder="账号" />
      <input type="password" placeholder="密码" />
      <div class="actions">
        <RouterLink to="/reg">前往注册</RouterLink>
        <div class="login-btn">登录</div>
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
        @apply text-primary;
      }
    }

    input {
      @apply px-3 py-2 text-lg;
      @apply border-0 ring-1 ring-primary rounded-md outline-none;
    }

    .login-btn {
      @apply px-3 py-2;
      @apply border-0 ring-1 ring-primary rounded-md text-primary;
      @apply cursor-pointer;
      @apply transition;
      &:hover {
        @apply bg-primary text-white;
      }
      &:active {
        @apply opacity-80;
      }
    }
  }
}
</style>
