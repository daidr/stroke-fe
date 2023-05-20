<script setup lang="ts">
import type { ISystemDoctorItem } from '@/api/system/actions'

defineProps<{
  isEdit: boolean
  isLoading: boolean
  item: ISystemDoctorItem
  setItemField: (key: keyof ISystemDoctorItem, value: any) => void
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
      <div class="label">用户名:</div>
      <div class="value">
        <input
          type="text"
          :value="item.username"
          @change="setItemField('username', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">密码Hash:</div>
      <div class="value">
        <input
          type="text"
          :value="item.password"
          @change="setItemField('password', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="item">
      <div class="label">是否激活:</div>
      <div class="value">
        <input
          type="checkbox"
          :checked="item.active"
          @change="setItemField('active', ($event.target as HTMLInputElement).checked)"
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
