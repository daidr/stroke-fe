<script setup lang="ts">
import type { ISystemRecordItem } from '@/api/system/actions'

defineProps<{
  isEdit: boolean
  isLoading: boolean
  item: ISystemRecordItem
  setItemField: (key: keyof ISystemRecordItem, value: any) => void
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
      <div class="label">诊断ID:</div>
      <div class="value">
        <input
          type="text"
          :value="item.diagnosis_id"
          @change="setItemField('diagnosis_id', ~~($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">记录时间:</div>
      <div class="value">
        <input
          type="text"
          :value="item.record_date"
          @change="setItemField('record_date', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">X%:</div>
      <div class="value">
        <input
          type="number"
          :value="item.main_vessel_ratio_x"
          @change="
            setItemField(
              'main_vessel_ratio_x',
              parseFloat(($event.target as HTMLInputElement).value)
            )
          "
        />
      </div>
    </div>
    <div class="item">
      <div class="label">Y%:</div>
      <div class="value">
        <input
          type="number"
          :value="item.general_vessel_ratio_y"
          @change="
            setItemField(
              'general_vessel_ratio_y',
              parseFloat(($event.target as HTMLInputElement).value)
            )
          "
        />
      </div>
    </div>
    <div class="item">
      <div class="label">Z%:</div>
      <div class="value">
        <input
          type="number"
          :value="item.tiny_vessel_ratio_z"
          @change="
            setItemField(
              'tiny_vessel_ratio_z',
              parseFloat(($event.target as HTMLInputElement).value)
            )
          "
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
