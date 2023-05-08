<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header>
    <div class="wrapper">
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
