<script setup lang="ts">
import {
  getGenderString,
  getPlanEffectionText,
  getStrokeLevelString,
  getStrokeTypeString
} from '@/utils/_'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    default: 0
  },
  age: {
    type: Number,
    default: 0
  },
  strokeType: {
    type: Number,
    default: 0
  },
  strokeLevel: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
    default: ''
  },
  currentPlanId: {
    type: Number,
    default: 0
  },
  setCurrentPlanId: {
    type: Function,
    default: () => {}
  },
  plans: {
    type: Object,
    default: () => ({})
  }
})

const currentPlan = computed(() => {
  return props.plans[props.currentPlanId]
})

const changePlan = (event: Event) => {
  props.setCurrentPlanId(parseInt((event.target as HTMLSelectElement).value))
}
</script>

<template>
  <div class="gadget">
    <div class="title">
      诊断信息
      <div class="subtitle">{{ date ? new Date(date).toLocaleDateString() : '未知日期' }}</div>
    </div>
    <div class="item">
      <div class="label">姓名：</div>
      <div class="value">{{ name }}</div>
    </div>
    <div class="item">
      <div class="label">性别：</div>
      <div class="value">{{ getGenderString(gender) }}</div>
    </div>
    <div class="item">
      <div class="label">年龄：</div>
      <div class="value">{{ age }}</div>
    </div>
    <div class="item">
      <div class="label">卒中类型：</div>
      <div class="value">{{ getStrokeTypeString(strokeType) }}</div>
    </div>
    <div class="inner-title">SSAS脑卒中智能评价结果</div>
    <div class="item">
      <div class="label">脑卒中程度：</div>
      <div class="value">{{ getStrokeLevelString(strokeLevel) }}</div>
    </div>
    <div class="item">
      <!-- TODO: WHAT IS THIS? -->
      <div class="label">
        康复方案<select class="plan-select" :value="currentPlanId" @change="changePlan">
          <option v-for="plan of plans" :key="plan.plan.id" :value="plan.plan.id">
            {{ plan.plan.name }}
          </option></select
        >：
      </div>
      <div class="value">{{ getPlanEffectionText(currentPlan.plan.effection) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gadget {
  .title {
    @apply text-3xl text-black dark:text-white font-bold select-none;
    @apply mb-4;
    @apply pl-3 relative;

    &::before {
      @apply absolute top-0 left-0 w-1 h-full rounded bg-zinc/50;
      content: '';
    }

    .subtitle {
      @apply text-sm text-zinc font-normal;
    }
  }

  .item {
    @apply flex w-full justify-between text-lg mb-2;

    .label {
      @apply select-none;
    }

    .plan-select {
      @apply transition-all rounded-md ml-1;

      &:hover {
        @apply ring-zinc/50 ring-2 mx-2;
      }
    }
  }

  .inner-title {
    @apply text-xl mt-6 mb-2 font-bold select-none;
  }
}
</style>
