<script setup lang="ts">
import type { ISystemDiagnoseItem } from '@/api/system/actions'

const props = defineProps<{
  isEdit: boolean
  isLoading: boolean
  item: ISystemDiagnoseItem
  setItem: (item: ISystemDiagnoseItem) => void
}>()

const setItemField = (key: keyof ISystemDiagnoseItem, value: any) => {
  props.setItem({
    ...props.item,
    [key]: value
  })
}
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
          @change="setItemField('id', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">医生ID:</div>
      <div class="value">
        <input
          type="text"
          :value="item.doctor_id"
          @change="setItemField('doctor_id', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">患者ID:</div>
      <div class="value">
        <input
          type="text"
          :value="item.patient_id"
          @change="setItemField('patient_id', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">诊断时间:</div>
      <div class="value">
        <input
          type="text"
          :value="item.diagnosis_date"
          @change="setItemField('diagnosis_date', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">脑卒中类型:</div>
      <div class="value">
        <select
          :value="item.stroke_type"
          @change="setItemField('stroke_type', ~~($event.target as HTMLSelectElement).value)"
        >
          <option :value="1">出血性脑卒中</option>
          <option :value="2">缺血性脑卒中</option>
        </select>
      </div>
    </div>
    <div class="item">
      <div class="label">脑卒中程度:</div>
      <div class="value">
        <select
          :value="item.stroke_level"
          @change="setItemField('stroke_level', ~~($event.target as HTMLSelectElement).value)"
        >
          <option :value="1">轻微</option>
          <option :value="2">中度</option>
          <option :value="3">严重</option>
        </select>
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
