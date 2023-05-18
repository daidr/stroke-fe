<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  getDoctorDiagnosisDetailsById,
  getDoctorPatientById,
  type IDoctorDiagnosisDetailsItem,
  type IDoctorPatientItem
} from '@/api/doctor/related'
import { useMessage } from '@/components/Message'
import PatientDetails from './views/PatientDetails.vue'
import { useRoute } from 'vue-router'

const { error, success } = useMessage()
const isFetching = ref(false)
const route = useRoute()

const diagnosisDetails = ref({} as IDoctorDiagnosisDetailsItem)
const patientInfo = ref({} as IDoctorPatientItem)

const fetchInfos = async () => {
  const id = parseInt(route.params.id as string)
  const pid = parseInt(route.params.pid as string)
  if (!id || !pid) {
    error('参数无效')
    return
  }
  isFetching.value = true
  await getDoctorDiagnosisDetailsById(id).then((res) => {
    if (!res) {
      error('获取诊断记录失败')
    } else {
      diagnosisDetails.value = res
      success('获取诊断记录成功')
    }
  })

  await getDoctorPatientById(pid).then((res) => {
    if (!res) {
      error('获取患者信息失败')
    } else {
      patientInfo.value = res
      success('获取患者信息成功')
    }
  })

  isFetching.value = false
}

const currentDiagnosis = computed(() => {
  return patientInfo.value.diagnosis?.find(
    (item) => item.id === parseInt(route.params.id as string)
  )
})

onMounted(() => {
  fetchInfos()
})
</script>

<template>
  <div class="diagnosis-wrapper">
    <div class="limit-view">
      <!-- 诊断详情 -->
      <PatientDetails
        class="col-span-5 row-span-full"
        :name="patientInfo.name"
        :age="patientInfo.age"
        :gender="patientInfo.sex"
        :stroke-level="currentDiagnosis?.stroke_level"
        :stroke-type="currentDiagnosis?.stroke_type"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.diagnosis-wrapper {
  @apply fixed top-15 left-0 right-0 bottom-0;
  @apply flex justify-center;

  .limit-view {
    @apply h-full max-w-1400px w-full border-zinc/50 border-x-1 border-solid;
    @apply grid grid-cols-24 grid-rows-24 gap-2 p-4;
  }
}
</style>
