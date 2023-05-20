<script setup lang="ts">
import type { ISystemPatientItem } from '@/api/system/actions'

defineProps<{
  isEdit: boolean
  isLoading: boolean
  item: ISystemPatientItem
  setItemField: (key: keyof ISystemPatientItem, value: any) => void
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
      <div class="label">姓名:</div>
      <div class="value">
        <input
          type="text"
          :value="item.name"
          @change="setItemField('name', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">性别:</div>
      <div class="value">
        <select
          :value="item.sex"
          @change="setItemField('sex', ~~($event.target as HTMLSelectElement).value)"
        >
          <option :value="1">男</option>
          <option :value="2">女</option>
          <option :value="0">其他</option>
        </select>
      </div>
    </div>
    <div class="item">
      <div class="label">年龄:</div>
      <div class="value">
        <input
          type="number"
          :value="item.age"
          @change="setItemField('age', ~~($event.target as HTMLInputElement).value)"
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
