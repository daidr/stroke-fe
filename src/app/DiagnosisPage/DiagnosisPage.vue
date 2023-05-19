<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  getDoctorDiagnosisDetailsById,
  getDoctorPatientById,
  getDoctorPlanTreatmentsById,
  type IDoctorDiagnosisDetailsItem,
  type IDoctorDiagnosisPlanItem,
  type IDoctorPatientItem,
  type IDoctorPlanTreatmentsItem
} from '@/api/doctor/related'
import { useMessage } from '@/components/Message'
import PatientDetails from './views/PatientDetails.vue'
import { useRoute } from 'vue-router'
import ReportImageBox from './views/ReportImageBox.vue'
import ReportDataBox from './views/ReportDataBox.vue'

const { error, success } = useMessage()
const isFetching = ref(true)
const route = useRoute()

const diagnosisDetails = ref({} as IDoctorDiagnosisDetailsItem)
const patientInfo = ref({} as IDoctorPatientItem)
const plansInfo = reactive(
  {} as Record<
    number,
    {
      plan: IDoctorDiagnosisPlanItem
      treatments: IDoctorPlanTreatmentsItem[]
    }
  >
)

const currentRecordId = ref(-1)
const setCurrentRecordId = (id: number) => {
  currentRecordId.value = id
}

const currentPlanId = ref(-1)
const setCurrentPlanId = (id: number) => {
  currentPlanId.value = id
}

const fetchInfos = async () => {
  const id = parseInt(route.params.id as string)
  const pid = parseInt(route.params.pid as string)
  if (!id || !pid) {
    error('参数无效')
    return
  }
  isFetching.value = true
  let _res1 = await getDoctorDiagnosisDetailsById(id)

  if (!_res1) {
    error('获取诊断记录失败')
  } else {
    diagnosisDetails.value = _res1
    // success('获取诊断记录成功')
  }

  let _res2 = await getDoctorPatientById(pid)
  if (!_res2) {
    error('获取患者信息失败')
  } else {
    patientInfo.value = _res2
    // success('获取患者信息成功')
  }

  for (let plan of diagnosisDetails.value.plans) {
    let _res3 = await getDoctorPlanTreatmentsById(plan.id)
    if (!_res3) {
      error('获取治疗方案失败')
    } else {
      plansInfo[plan.id] = {
        plan,
        treatments: _res3
      }
      // success('获取治疗方案成功')
    }
  }
  setCurrentRecordId(diagnosisDetails.value.records[0].id)
  setCurrentPlanId(diagnosisDetails.value.plans[0].id)
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
      <template v-if="isFetching">
        <div class="flex items-center justify-center col-span-full row-span-full">
          <div class="i-mingcute-refresh-2-line text-zinc/50 text-7xl animate-spin"></div>
        </div>
      </template>
      <template v-else>
        <!-- 诊断详情 -->
        <PatientDetails
          class="col-span-5 row-span-full"
          :name="patientInfo.name"
          :age="patientInfo.age"
          :gender="patientInfo.sex"
          :stroke-level="currentDiagnosis?.stroke_level"
          :stroke-type="currentDiagnosis?.stroke_type"
          :date="currentDiagnosis?.diagnosis_date"
          :plans="plansInfo"
          :current-plan-id="currentPlanId"
          :set-current-plan-id="setCurrentPlanId"
        />
        <!-- 图片预览器 -->
        <ReportImageBox
          class="col-span-19 row-span-12"
          :records="diagnosisDetails.records"
          :current-record-id="currentRecordId"
          :set-current-record-id="setCurrentRecordId"
        />
        <!-- 血管参数专业分析 -->
        <ReportDataBox
          class="col-span-19 row-span-12"
          :records="diagnosisDetails.records"
          :plans="plansInfo"
          :current-record-id="currentRecordId"
          :set-current-record-id="setCurrentRecordId"
          :current-plan-id="currentPlanId"
          :set-current-plan-id="setCurrentPlanId"
        />
      </template>
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
