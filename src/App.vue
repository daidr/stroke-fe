<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import MessageContainer from '@/components/Message/MessageContainer.vue'
const route = useRoute()
</script>

<template>
  <MainHeader v-if="!route.meta.hideHeader" />
  <RouterView />
  <MessageContainer />
</template>

<style scoped></style>
