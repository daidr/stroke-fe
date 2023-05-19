<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'
import SquareProgress from './SquareProgress.vue'

const props = defineProps<{
  dim: string[]
  selfval: number[]
}>()
use([CanvasRenderer, RadarChart, TitleComponent, TooltipComponent])

const option = computed(() => {
  return {
    radar: {
      indicator: props.dim.map((item) => ({ name: item, max: 100 })),
      axisName: {
        color: '#5a5a5e'
      },
      axisLine: {
        lineStyle: {
          opacity: 0.5
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          opacity: 0.5
        }
      },
      // 分割线透明度
      splitLine: {
        lineStyle: {
          opacity: 0.5
        }
      }
    },
    series: [
      {
        name: '综合表现',
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 2
          },
          focus: 'self'
        },

        data: [
          {
            value: props.selfval,
            name: '理想恢复情况',
            itemStyle: {
              color: '#d56180'
            },
            areaStyle: {
              opacity: 0.8
            },
            lineStyle: {
              width: 0
            },
            symbolSize: 0
          }
        ]
      }
    ],
    tooltip: {
      trigger: 'item'
    }
  }
})
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <div class="h-full col-span-2">
      <v-chart class="chart" :option="option" autoresize />
    </div>
    <div class="col-span-3 flex flex-col items-stretch justify-center">
      <div class="h-2em"></div>
      <div class="item">
        <div class="label">主血管比例x%:</div>
        <square-progress :progress="selfval[0]/10" />
      </div>
      <div class="item">
        <div class="label">一般血管比例y%:</div>
        <square-progress :progress="selfval[1]/10" />
      </div>
      <div class="item">
        <div class="label">毛细血管比例z%:</div>
        <square-progress :progress="selfval[2]/10" />
      </div>
      <div class="item">
        <div class="label">缺血区域体积V:</div>
        <square-progress :progress="selfval[3]/10" />
      </div>
      <div class="item">
        <div class="label">血管密度P:</div>
        <square-progress :progress="selfval[4]/10" />
      </div>

      <div class="text-sm text-zinc/40 text-right select-none">备注：0-9代表血管参数恢复程度</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.item {
  @apply flex justify-between items-center mb-2;
}
</style>
