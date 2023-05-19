<script setup lang="ts">
import { Treatment, type ISystemTreatmentItem } from '@/api/system/actions'
import ReadonlyList from '@/components/List/ReadonlyList.vue'
import { useMessage } from '@/components/Message'
import { h, onMounted, reactive, ref } from 'vue'
import { createCustomModal } from '@/components/Modal'
import TreatmentEditVue from './_EditView/TreatmentEdit.vue'
import { date2String } from '@/utils/_'

type TItem = ISystemTreatmentItem
const Actions = Treatment

const colMap = [
  { name: 'ID', key: 'id' },
  { name: '方案ID (plan_id)', key: 'plan_id' },
  {
    name: '治疗时间 (treatment_date)',
    key: 'treatment_date',
    func: (value: any) => date2String(value)
  },
  { name: '缺血区域V (ischemic_area_v)', key: 'ischemic_area_v' },
  { name: '血管密度P (vessel_density_p)', key: 'vessel_density_p' }
]

const listLoading = ref(true)
const dataList = reactive([] as TItem[])
const { success, error } = useMessage()

const onRemoveBtnClick = async (item: any) => {
  let _item = item as TItem
  listLoading.value = true
  const result = await Actions.delete(_item.id)
  if (result) {
    success('删除成功')
    await refreshList()
  } else {
    error('删除失败')
  }
  listLoading.value = false
}

const onEditBtnClick = (item: any) => {
  let _item = reactive(JSON.parse(JSON.stringify(item)) as TItem)
  let isLoading = ref(false)
  const view = h(TreatmentEditVue, {
    item: _item,
    isLoading,
    isEdit: true,
    setItemField: (key: keyof TItem, value: any) => {
      _item[key] = value
    }
  })
  const onOk = async () => {
    isLoading.value = true
    const result = await Actions.update(_item.id, _item)
    if (result) {
      success('更新成功')
      modal.component.exposed.close()
      await refreshList()
    } else {
      error('更新失败')
    }
    isLoading.value = false
  }
  const modal: any = createCustomModal({
    title: '编辑',
    isLoading: isLoading,
    content: view,
    autoClose: false,
    onCancel: () => {
      modal.component.exposed.close()
    },
    dynamic: true,
    onOk
  })
}

const refreshList = async () => {
  listLoading.value = true
  const result = await Actions.list()
  if (!result) {
    error('获取列表失败')
  } else {
    dataList.length = 0
    dataList.push(...result)
  }
  listLoading.value = false
}

const addItem = () => {
  let _item = reactive({} as TItem)
  let isLoading = ref(false)
  const view = h(TreatmentEditVue, {
    item: _item,
    isLoading,
    setItemField: (key: keyof TItem, value: any) => {
      _item[key] = value
    }
  })
  const onOk = async () => {
    isLoading.value = true
    const result = await Actions.create(_item)
    if (result) {
      success('创建成功')
      modal.component.exposed.close()
      await refreshList()
    } else {
      error('创建失败')
    }
    isLoading.value = false
  }
  const modal: any = createCustomModal({
    title: '新增',
    isLoading: isLoading,
    content: view,
    autoClose: false,
    onCancel: () => {
      modal.component.exposed.close()
    },
    dynamic: true,
    onOk
  })
}

onMounted(() => {
  refreshList()
})
</script>

<template>
  <div class="h-full">
    <template v-if="listLoading">
      <div class="flex items-center justify-center h-full">
        <div class="i-mingcute-refresh-2-line text-zinc/50 text-7xl animate-spin"></div>
      </div>
    </template>
    <template v-else>
      <ReadonlyList
        :list="dataList"
        list-key="id"
        :colMap="colMap"
        :opBtns="[
          { name: '删除', func: onRemoveBtnClick },
          { name: '编辑', func: onEditBtnClick }
        ]"
      />
      <div class="add-btn" @click="addItem">
        <div class="i-mingcute-add-line text-2xl"></div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.add-btn {
  @apply fixed bottom-5 right-5 z-50 cursor-pointer transition;
  @apply rounded-full border-2 border-zinc/50 w-12 h-12;
  @apply flex items-center justify-center;
  @apply bg-zinc/10;
  @apply transform-gpu;

  &:hover {
    @apply bg-zinc/50;
  }

  &:active {
    @apply scale-90;
  }
}
</style>
