<script setup lang="ts">
import type { ISystemTreatmentItem } from '@/api/system/actions'

defineProps<{
  isEdit: boolean
  isLoading: boolean
  item: ISystemTreatmentItem
  setItemField: (key: keyof ISystemTreatmentItem, value: any) => void
}>()
</script>

<template>
  <div class="panel">
    <div class="item">
      <div class="label">ID:</div>
      <div class="value">
        <input
          type="text"
          :value="item.id"
          :disabled="isEdit"
          @change="setItemField('id', ~~($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">方案ID:</div>
      <div class="value">
        <input
          type="text"
          :value="item.plan_id"
          @change="setItemField('plan_id', ~~($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">治疗时间:</div>
      <div class="value">
        <input
          type="text"
          :value="item.treatment_date"
          @change="setItemField('treatment_date', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">缺血区域体积V:</div>
      <div class="value">
        <input
          type="number"
          :value="item.ischemic_area_v"
          @change="
            setItemField('ischemic_area_v', parseFloat(($event.target as HTMLInputElement).value))
          "
        />
      </div>
    </div>
    <div class="item">
      <div class="label">血管密度P:</div>
      <div class="value">
        <input
          type="number"
          :value="item.vessel_density_p"
          @change="
            setItemField('vessel_density_p', parseFloat(($event.target as HTMLInputElement).value))
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  @apply text-black dark:text-white py-1 flex flex-col space-y-4;

  .item {
    @apply flex space-x-2 justify-between items-center;

    .label {
      @apply font-bold select-none;
    }

    input,
    select {
      @apply rounded-md px-2 py-1 border-1 border-zinc/50;

      &:disabled {
        @apply text-black/50 dark:text-white/50;
      }
    }
  }
}
</style>
