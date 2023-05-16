<script setup lang="ts">
import type { IDoctorDiagnosisItem } from '@/api/doctor/related'
import type { PropType } from 'vue'

defineProps({
  name: {
    type: String,
    default: ''
  },
  item: {
    type: Object as PropType<IDoctorDiagnosisItem>,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="flex">
      <div class="flex-grow">
        <div class="text-sm pb-2 text-black/30">
          {{ new Date(item.diagnosis_date).toLocaleDateString() }}
        </div>
        <div v-if="name" class="name">姓名：{{ name }}</div>
        <div class="date">诊断ID：{{ item.id }}</div>
      </div>
      <div class="flex-shrink-0 flex items-center">
        <div class="rounded-md text-sm px-1 mr-1 text-white bg-red">严重</div>
        <div class="text-black/40 text-sm">出血性脑卒中</div>
      </div>
    </div>
  </div>
</template>
