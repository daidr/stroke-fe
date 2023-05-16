<script setup lang="ts">
import { usePreferredDark, useLocalStorage } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { ref, watchEffect } from 'vue'
function readDarkModeInStorage() {
  const darkMode = useLocalStorage('darkMode', 'auto')
  const possibleValues = ['auto', 'dark', 'light']
  if (darkMode.value && possibleValues.includes(darkMode.value)) {
    return darkMode.value
  } else {
    return 'auto'
  }
}

const currentMode = ref(readDarkModeInStorage())
const preferredDark = usePreferredDark()

watchEffect(() => {
  if (currentMode.value === 'auto') {
    if (preferredDark.value) {
      setModeClass(true)
    } else {
      setModeClass(false)
    }
  } else if (currentMode.value === 'dark') {
    setModeClass(true)
  } else if (currentMode.value === 'light') {
    setModeClass(false)
  }

  useLocalStorage('darkMode', 'auto').value = currentMode.value
})

function setModeClass(isDark: boolean): void {
  if (isDark) {
    useHead({
      htmlAttrs: { class: 'dark' }
    })
  } else {
    useHead({
      htmlAttrs: { class: '' }
    })
  }
}
</script>

<template>
  <select v-model="currentMode">
    <option value="auto">🌓</option>
    <option value="dark">🌙</option>
    <option value="light">☀️</option>
  </select>
</template>

<style scoped lang="scss">
select {
  @apply text-[15px] text-black;
  @apply px-2 py-1.5;
  @apply border-none rounded-[0.25em];
  @apply outline-none cursor-pointer transition;
  @apply hover:bg-zinc/20 appearance-none;

  option {
    @apply bg-white text-gray;
    @apply dark:(bg-gray text-white);
  }
}
</style>
