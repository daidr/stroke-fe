<script setup lang="ts">
import type {
  IDoctorDiagnosisPlanItem,
  IDoctorDiagnosisRecordItem,
  IDoctorPlanTreatmentsItem
} from '@/api/doctor/related'
import ReportRadar from './graphs/ReportRadar.vue'
import { computed } from 'vue'
import ReportLine from './graphs/ReportLine.vue'
const props = defineProps<{
  records: IDoctorDiagnosisRecordItem[]
  plans: Record<
    number,
    {
      plan: IDoctorDiagnosisPlanItem
      treatments: IDoctorPlanTreatmentsItem[]
    }
  >
  currentRecordId: number
  setCurrentRecordId: (id: number) => void
  currentPlanId: number
  setCurrentPlanId: (id: number) => void
}>()

const currentRecord = computed(() => {
  return props.records.find((item) => item.id === props.currentRecordId)
})

const currentPlan = computed(() => {
  return props.plans[props.currentPlanId]
})
</script>
<template>
  <div class="gadget">
    <div class="title">血管参数专业分析</div>
    <div class="grid grid-cols-2 flex-grow">
      <ReportLine
        :records="records"
        :plan="currentPlan"
        :set-current-record-id="setCurrentRecordId"
      />
      <ReportRadar
        :dim="['x%', 'y%', 'z%', 'V', 'P']"
        :selfval="[currentRecord!.main_vessel_ratio_x, currentRecord!.general_vessel_ratio_y, currentRecord!.tiny_vessel_ratio_z, currentRecord!.ischemic_area_v, currentRecord!.vessel_density_p]"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.gadget {
  @apply flex flex-col;
  .title {
    @apply text-3xl text-black dark:text-white font-bold select-none;
    @apply mb-4;
    @apply pl-3 relative;

    &::before {
      @apply absolute top-0 left-0 w-1 h-full rounded bg-zinc/50;
      content: '';
    }

    .subtitle {
      @apply text-sm text-zinc font-normal;
    }
  }
}
</style>
