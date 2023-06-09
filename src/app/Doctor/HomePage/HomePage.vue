<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { onMounted, reactive, ref } from 'vue'
import {
  getDoctorDiagnosisList,
  type IDoctorDiagnosisList,
  type IDoctorPatientItem
} from '@/api/doctor/related'
import { useMessage } from '@/components/Message'
import DiagnosisItem from '@/components/DiagnosisItem.vue'
import { getDoctorPatientById } from '@/api/doctor/related'
import { getGenderString } from '@/utils/_'

const { error, success } = useMessage()

const patientsMap = reactive({} as Record<number, IDoctorPatientItem>)
const diagnosisList = reactive([] as IDoctorDiagnosisList)
const isFetching1 = ref(false)
const list1 = ref<HTMLElement | null>(null)
const { y: y1 } = useScroll(list1)
const list2 = ref<HTMLElement | null>(null)
const { y: y2 } = useScroll(list2)

const selectedPatient = ref(-1)

const fetchDiagnosisList = async (first = false) => {
  selectedPatient.value = -1
  isFetching1.value = true
  const res = await getDoctorDiagnosisList()
  diagnosisList.length = 0

  if (!res) {
    error('获取诊断记录失败')
  } else {
    diagnosisList.push(...res)
    !first && success('获取诊断记录成功')
  }
  await getPatientsInfo()
  isFetching1.value = false
}

const getPatientsInfo = async () => {
  for (let i = 0; i < diagnosisList.length; i++) {
    const item = diagnosisList[i]
    const { patient_id } = item
    if (patientsMap[patient_id]) {
      continue
    }
    const res = await getDoctorPatientById(patient_id)
    if (!res) {
      error(`获取患者 ⌈${patient_id}⌋ 信息失败`)
      return
    }
    patientsMap[patient_id] = res
  }
}

onMounted(() => {
  fetchDiagnosisList(true)
})
</script>

<template>
  <div class="home-wrapper">
    <div class="split-view">
      <div class="left">
        <template v-if="isFetching1">
          <div class="w-full h-full flex justify-center items-center">
            <div class="i-mingcute-refresh-2-line text-zinc/50 animate-spin text-5xl"></div>
          </div>
        </template>
        <template v-else-if="diagnosisList.length == 0">
          <div class="w-full h-full flex justify-center items-center select-none">
            <span class="text-black/50 dark:text-white/50">无诊断记录</span>
            <div
              class="refresh-btn"
              @click="
                () => {
                  fetchDiagnosisList()
                }
              "
            >
              <div class="i-mingcute-refresh-2-line text-zinc"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-full flex flex-col">
            <div class="title-wrapper" :class="{ 'not-top': y1 > 0 }">
              <div class="title">诊断列表</div>
              <div
                class="refresh-btn absolute right-4 top-1/2 transform -translate-y-1/2 text-lg"
                @click="
                  () => {
                    fetchDiagnosisList()
                  }
                "
              >
                <div class="i-mingcute-refresh-2-line text-zinc"></div>
              </div>
            </div>
            <div ref="list1" class="clist">
              <template v-for="item in diagnosisList" :key="item.id">
                <DiagnosisItem
                  class="clist-item"
                  :class="{
                    selected: selectedPatient === item.patient_id
                  }"
                  @click="() => (selectedPatient = item.patient_id)"
                  :name="patientsMap[item.patient_id].name"
                  :item="item"
                />
              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="right">
        <template v-if="selectedPatient === -1">
          <div class="w-full h-full flex justify-center items-center">
            <span class="text-black/50 dark:text-white/50 select-none">请在左侧选择一份报告</span>
          </div>
        </template>
        <template v-else>
          <div class="h-full flex flex-col">
            <div class="border-b-1 border-b-solid border-zinc/50 p-4 flex space-x-4">
              <div class="w-20 h-20 rounded-full bg-zinc/20 overflow-hidden">
                <div class="i-mingcute-user-5-line text-20 text-zinc"></div>
              </div>
              <div class="flex flex-col justify-between">
                <div class="font-bold text-4xl">
                  {{ patientsMap[selectedPatient].name }}
                  <span class="text-black/40 dark:text-white/40 text-2xl"
                    >#{{ selectedPatient }}</span
                  >
                </div>
                <div class="grid grid-cols-2">
                  <div class="gender">
                    性别：{{ getGenderString(patientsMap[selectedPatient].sex) }}
                  </div>
                  <div class="age">年龄：{{ patientsMap[selectedPatient].age }}</div>
                </div>
              </div>
            </div>
            <div class="title-wrapper" :class="{ 'not-top': y2 > 0 }">
              <div class="title">{{ patientsMap[selectedPatient].name }} 的历史诊断</div>
            </div>
            <div ref="list2" class="clist">
              <template v-for="item in patientsMap[selectedPatient].diagnosis" :key="item.id">
                <RouterLink
                  :to="{ name: 'diagnosis', params: { pid: item.patient_id, id: item.id } }"
                >
                  <DiagnosisItem
                    class="clist-item"
                    :name="patientsMap[selectedPatient].name"
                    :item="item"
                  />
                </RouterLink>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-wrapper {
  @apply fixed top-15 left-0 right-0 bottom-0;
  @apply flex justify-center;

  .title-wrapper {
    @apply w-full h-64px flex items-center transition duration-300 flex-shrink-0 select-none;
    @apply border-zinc/0 border-b-1 border-b-solid;
    @apply relative;
    transition-property: font-size, font-weight, border-color, height, left, transform;

    .title {
      @apply text-3xl font-extrabold transition duration-300;
      @apply absolute top-1/2 left-5 transform-gpu -translate-y-1/2;
      transition-property: font-size, font-weight, border-color, height, left, transform;
    }

    &.not-top {
      @apply border-zinc/50 h-48px;

      .title {
        @apply text-lg font-normal left-1/2 -translate-x-1/2;
      }
    }
  }
  .refresh-btn {
    @apply cursor-pointer ml-2;
    @apply transition-colors p-0.5 rounded-md;

    &:hover {
      @apply bg-zinc/20;
    }

    &:active {
      @apply bg-zinc/30;
    }
  }

  .clist {
    @apply overflow-y-auto scroll-smooth;
    .clist-item {
      @apply py-2 px-4;
      @apply border-zinc/30 border-b-1 border-b-solid;

      &:hover {
        @apply bg-zinc/5 cursor-pointer;
      }

      &.selected {
        @apply bg-zinc/10;
      }

      &:last-child {
        @apply border-b-0;
      }
    }
  }

  .split-view {
    @apply flex h-full max-w-1400px w-full;

    .left {
      @apply border-zinc/50 border-l-1 border-l-solid w-1/2 h-full;
    }
    .right {
      @apply border-zinc/50 border-l-1 border-l-solid border-r-1 border-r-solid w-1/2 h-full;
    }
  }
}
</style>
