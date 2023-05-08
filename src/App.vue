<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'

const route = useRoute()
</script>

<template>
  <MainHeader v-if="!route.meta.hideHeader" />
  <RouterView />
</template>

<style scoped>

</style>
