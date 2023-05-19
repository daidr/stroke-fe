<script setup lang="ts">
interface ColumnItem {
  name: string
  key: string
  func?: (value: any) => any
}
interface TableItem {
  [key: string]: any
}
defineProps<{
  colMap: ColumnItem[]
  list: TableItem[]
  listKey: string
  opBtns: { name: string; func: (item?: TableItem, list?: TableItem[]) => void }[]
}>()
</script>

<template>
  <div class="clist-wrapper">
    <div class="clist">
      <table>
        <thead>
          <tr>
            <th v-for="col of colMap" :key="col['name']">{{ col['name'] }}</th>
            <th v-if="opBtns.length > 0" class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) of list"
            :key="listKey ? item[listKey] : index"
            class="clist-item"
          >
            <td v-for="col of colMap" :key="item[col['key']]">
              {{
                typeof col['func'] === 'function' ? col['func'](item[col['key']]) : item[col['key']]
              }}
            </td>
            <td v-if="opBtns.length > 0" class="text-center">
              <div
                v-for="btnInfo of opBtns"
                :key="btnInfo.name"
                class="op-btn"
                @click="btnInfo.func(item, list)"
              >
                {{ btnInfo.name }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clist-wrapper {
  @apply mt-1px;
  @apply overflow-hidden;

  .clist {
    @apply overflow-y-auto;

    table {
      @apply w-full table-auto text-left;
      @apply text-black/80 dark:text-white/80 text-base;

      thead {
        @apply sticky top-0 bg-zinc/30 bg-opacity-80;
        @apply select-none;
        @apply whitespace-nowrap;
        @apply z-1;
      }

      th,
      td {
        @apply p-1;
        @apply whitespace-nowrap;
      }

      .options-head {
        @apply w-150px;
      }

      .op-btn {
        @apply motion-safe:transition;
        @apply cursor-pointer;
        @apply inline px-1 py-0.5;
        @apply border-transparent;

        &:hover {
          @apply border-b-2 border-black/80 dark:border-white/80;
        }
      }

      .options {
        @apply flex;
        @apply justify-center;
        @apply items-center;
        @apply gap-x-1;
        @apply select-none;

        &.disabled {
          @apply pointer-events-none;
        }
      }
    }
  }
}
</style>
