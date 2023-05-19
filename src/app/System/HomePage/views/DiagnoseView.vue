<script setup lang="ts">
import { Diagnose, type ISystemDiagnoseItem } from '@/api/system/actions'
import ReadonlyList from '@/components/List/ReadonlyList.vue'
import { useMessage } from '@/components/Message'
import { h, onMounted, reactive, ref } from 'vue'
import { createCustomModal } from '@/components/Modal'
import DiagnoseEditVue from './_EditView/DiagnoseEdit.vue'

type TItem = ISystemDiagnoseItem
const Actions = Diagnose

const colMap = [
  { name: 'ID', key: 'id' },
  { name: '医生 (doctor_id)', key: 'doctor_id' },
  { name: '患者ID (patient_id)', key: 'patient_id' },
  { name: '诊断时间 (diagnosis_date)', key: 'diagnosis_date' },
  { name: '脑卒中类型 (stroke_type)', key: 'stroke_type' },
  { name: '脑卒中程度 (stroke_level)', key: 'stroke_level' }
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
  const view = h(DiagnoseEditVue, {
    item: _item,
    isLoading
  })
  const onOk = async () => {
    isLoading.value = true
    const result = await Actions.update(_item.id, _item)
    if (result) {
      success('更新成功')
      await refreshList()
    } else {
      error('更新失败')
    }
    isLoading.value = false
    modal.component.exposed.close()
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
  console.log(item)
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
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
