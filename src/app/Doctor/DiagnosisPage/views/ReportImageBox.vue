<script setup lang="ts">
import type { IDoctorDiagnosisRecordItem } from '@/api/doctor/related'
import { reactive, ref } from 'vue'

const props = defineProps<{
  records: IDoctorDiagnosisRecordItem[]
  currentRecordId: number
  setCurrentRecordId: (id: number) => void
}>()

const getRecordImage = (url: string) => {
  if (url === 'https://www.baidu.com/') {
    return '/demo.png'
  }
  return url
}

const getRecordRelativeDay = (record: IDoctorDiagnosisRecordItem) => {
  const date = new Date(record.record_date)
  const firstdate = new Date(props.records[0].record_date)
  const day = Math.floor((date.getTime() - firstdate.getTime()) / (24 * 3600 * 1000)) + 1
  return day
}

const ImageContainerRef = ref(null as HTMLDivElement | null)

const recordImagePos = reactive({} as Record<number, [number, number]>)
const recordImageSize = reactive({} as Record<number, [number, number]>)

const padding = 30

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const onImageLoaded = (event: Event, recordId: number) => {
  const ContainerWidth = (ImageContainerRef.value as HTMLDivElement).offsetWidth
  const ContainerHeight = (ImageContainerRef.value as HTMLDivElement).offsetHeight
  const imageWidth = (event.target as HTMLImageElement).width
  const imageHeight = (event.target as HTMLImageElement).height
  recordImageSize[recordId] = [imageWidth, imageHeight]

  const minX = padding
  const maxX = ContainerWidth - imageWidth - padding
  const minY = padding
  const maxY = ContainerHeight - imageHeight - padding

  const x = randomInt(minX, maxX)
  const y = randomInt(minY, maxY)

  recordImagePos[recordId] = [x, y]
}

const isMouseDown = ref(false)
let _tempEventFunction: any = null

const onMouseUp = () => {
  isMouseDown.value = false
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('pointermove', _tempEventFunction)
}

const onPointerMove = (e: PointerEvent, recordId: number) => {
  if (!isMouseDown.value) return
  const ContainerWidth = (ImageContainerRef.value as HTMLDivElement).offsetWidth
  const ContainerHeight = (ImageContainerRef.value as HTMLDivElement).offsetHeight
  const imageWidth = recordImageSize[recordId][0]
  const imageHeight = recordImageSize[recordId][1]
  const deltaX = e.movementX
  const deltaY = e.movementY
  const x = recordImagePos[recordId][0] + deltaX
  const y = recordImagePos[recordId][1] + deltaY
  if (x < padding || x > ContainerWidth - imageWidth - padding) return
  if (y < padding || y > ContainerHeight - imageHeight - padding) return
  recordImagePos[recordId] = [x, y]
}

const onMouseDown = (recordId: number) => {
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('pointermove', _tempEventFunction)
  props.setCurrentRecordId(recordId)
  isMouseDown.value = true
  window.addEventListener('mouseup', onMouseUp)
  _tempEventFunction = (e: PointerEvent) => onPointerMove(e, recordId)
  window.addEventListener('pointermove', _tempEventFunction)
}
</script>

<template>
  <div>
    <div ref="ImageContainerRef" class="px-2 h-full overflow-hidden relative">
      <template v-for="record of records" :key="record.id">
        <div
          class="image-container"
          :style="{
            top: recordImagePos[record.id] ? recordImagePos[record.id][1] + 'px' : 0 + 'px',
            left: recordImagePos[record.id] ? recordImagePos[record.id][0] + 'px' : 0 + 'px',
            opacity: recordImagePos[record.id] ? 1 : 0
          }"
          v-viewer.static="{ inline: false }"
          :class="{
            current: currentRecordId === record.id
          }"
        >
          <div class="inner">
            <div class="move-el" @pointerdown="onMouseDown(record.id)">
              <div class="i-mingcute-more-1-line text-2xl"></div>
            </div>
            <div class="relative flex flex-col items-center justify-center">
              <img
                class="cursor-pointer"
                :src="getRecordImage(record.image_source)"
                @load="onImageLoaded($event, record.id)"
              />
              <span class="label">第{{ getRecordRelativeDay(record) }}天</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-container {
  @apply max-w-250px absolute;

  &.current {
    @apply z-2;
  }

  .inner {
    @apply relative;
  }

  .move-el {
    @apply select-none;
    @apply pointer-events-none opacity-0;
    @apply absolute -top-25px -left-4px -right-4px bottom-[calc(1em+8px)] bg-gray-200 dark:bg-gray-800 ring-zinc ring-1;
    @apply rounded-xl;
    @apply transition;
    @apply cursor-move;
    @apply flex justify-center;
  }

  &:hover,
  &.current {
    .move-el {
      @apply opacity-100 pointer-events-auto;
    }
  }

  img {
    @apply ring-zinc/50 ring-1 rounded-xl overflow-hidden;
  }

  .label {
    @apply select-none pt-1;
    @apply text-black dark:text-white;
    @apply filter-drop-shadow-color-white dark:filter-drop-shadow-color-black;
    filter: drop-shadow(0 0px 2px var(--un-drop-shadow-color))
      drop-shadow(0 0px 5px var(--un-drop-shadow-color));
  }
}
</style>
