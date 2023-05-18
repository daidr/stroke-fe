<script setup lang="ts">
import { format, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'
import type { IDoctorDiagnosisRecordItem } from '@/api/doctor/related'
import type { IDoctorDiagnosisPlanItem } from '@/api/doctor/related'
import type { IDoctorPlanTreatmentsItem } from '@/api/doctor/related'

const props = defineProps<{
  records: IDoctorDiagnosisRecordItem[]
  plan: {
    plan: IDoctorDiagnosisPlanItem
    treatments: IDoctorPlanTreatmentsItem[]
  }
  setCurrentRecordId: (id: number) => void
}>()

use([
  CanvasRenderer,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
])

const getDateString = (date: string) => {
  var _date = new Date(date)
  var dayStr = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate()].join('-')
  return dayStr
}

const option = computed(() => {
  return {
    legend: {
      top: 'top'
    },
    tooltip: {
      triggerOn: 'none',
      position: function (pt: number[]) {
        return [pt[0], 130]
      }
    },
    xAxis: {
      type: 'category',
      axisPointer: {
        snap: true,
        lineStyle: {
          color: '#d0d0d4',
          opacity: 0.5,
          width: 2
        },
        label: {
          show: true,
          formatter: function (params: any) {
            // setCurrentRecordId
            if(params.seriesData && params.seriesData[0] && params.seriesData[0].data) {
              props.setCurrentRecordId(params.seriesData[0].data.value[2].id)
            }
            
            return format.formatTime('yyyy-MM-dd', params.value)
          },
          backgroundColor: '#a9a9ab'
        },
        handle: {
          show: true,
          color: '#a9a9ab'
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: [
      {
        type: 'value',
        axisTick: {
          inside: true
        },
        splitLine: {
          show: true
        },
        axisLabel: {
          inside: true,
          formatter: '{value}\n'
        },
        min: 0,
        max: 100
      },
      {
        type: 'value',
        axisTick: {
          inside: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        min: 0,
        max: 100
      }
    ],
    grid: {
      top: 90,
      left: 30,
      right: 30,
      height: 200
    },
    dataZoom: [
      {
        type: 'inside',
        throttle: 50
      }
    ],
    series: [
      {
        name: '缺血区域V(理想恢复情况)',
        type: 'line',
        symbol: 'circle',
        symbolSize: 5,
        itemStyle: {
          color: '#db6082'
        },
        yAxisIndex: 0,
        data: props.records.map((item) => {
          return {
            value: [getDateString(item.record_date), item.ischemic_area_v, { id: item.id }]
          }
        })
      },
      {
        name: `缺血区域V(${props.plan.plan.name})`,
        type: 'line',
        symbol: 'circle',
        symbolSize: 5,
        itemStyle: {
          color: '#886da3'
        },
        data: props.plan.treatments.map((item) => {
          return {
            value: [getDateString(item.treatment_date), item.ischemic_area_v, { id: item.id }]
          }
        })
      },
      {
        name: '血管密度P(理想恢复情况)',
        type: 'line',
        symbol: 'triangle',
        symbolSize: 5,
        itemStyle: {
          color: '#db6082'
        },
        yAxisIndex: 0,
        data: props.records.map((item) => {
          return {
            value: [getDateString(item.record_date), item.vessel_density_p, { id: item.id }]
          }
        })
      },
      {
        name: `血管密度P(${props.plan.plan.name})`,
        type: 'line',
        symbol: 'triangle',
        symbolSize: 5,
        itemStyle: {
          color: '#886da3'
        },
        data: props.plan.treatments.map((item) => {
          return {
            value: [getDateString(item.treatment_date), item.vessel_density_p, { id: item.id }]
          }
        })
      }
    ]
  }
})
</script>

<template>
  <div class="">
    <div class="h-full w-full">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>
<style scoped lang="scss">
.item {
  @apply flex justify-between items-center mb-2;
}
</style>
