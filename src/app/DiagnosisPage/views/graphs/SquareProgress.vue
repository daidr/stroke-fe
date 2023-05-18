<script setup lang="ts">
defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="progress-wrapper">
    <div class="progress">
      <div
        class="progress-item"
        v-for="index of 9"
        :key="index"
        :class="{ active: index <= Math.round(progress) }"
      ></div>
    </div>
    <div class="progress-number">{{ Math.round(progress) }}</div>
  </div>
</template>

<style scoped lang="scss">
.progress-wrapper {
  @apply flex items-center;

  .progress {
    @apply flex items-center;

    .progress-item {
      @apply w-1em h-1em border-zinc/50 border-1;

      &:not(:first) {
        @apply ml-1;
      }

      &.active {
        @apply bg-zinc/40;
      }
    }
  }
  .progress-number {
    @apply w-4 flex-shrink-0 ml-2 text-right;
  }
}
</style>
