<script setup lang="ts">
import { getGenderString, getStrokeLevelString, getStrokeTypeString } from '@/utils/_'

defineProps({
  name: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    default: 0
  },
  age: {
    type: Number,
    default: 0
  },
  strokeType: {
    type: Number,
    default: 0
  },
  strokeLevel: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="gadget">
    <div class="title">诊断信息</div>
    <div class="item">
      <div class="label">姓名：</div>
      <div class="value">{{ name }}</div>
    </div>
    <div class="item">
      <div class="label">性别：</div>
      <div class="value">{{ getGenderString(gender) }}</div>
    </div>
    <div class="item">
      <div class="label">年龄：</div>
      <div class="value">{{ age }}</div>
    </div>
    <div class="item">
      <div class="label">卒中类型：</div>
      <div class="value">{{ getStrokeTypeString(strokeType) }}</div>
    </div>
    <div class="subtitle">SSAS脑卒中智能评价结果</div>
    <div class="item">
      <div class="label">脑卒中程度：</div>
      <div class="value">{{ getStrokeLevelString(strokeLevel) }}</div>
    </div>
    <div class="item">
      <!-- TODO: WHAT IS THIS? -->
      <div class="label">康复方案a：</div>
      <div class="value">一般</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gadget {
    .title {
        @apply text-3xl text-black dark:text-white font-bold select-none;
        @apply mb-4;
        @apply pl-3 relative;

        &::before {
            @apply absolute top-0 left-0 w-1 h-full rounded bg-zinc/50;
            content: '';
        }
    }

    .item {
        @apply flex w-full justify-between text-lg mb-2;
    }
}
</style>
