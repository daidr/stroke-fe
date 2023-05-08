<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  /**
   * 是否可见
   */
  visible: {
    type: Boolean,
    default: false
  },
  visibleModifiers: {
    type: Object,
    default: () => ({})
  },
  /**
   * 确认按钮文本
   */
  okText: {
    type: String,
    default: '确认'
  },
  /**
   * 取消按钮文本
   */
  cancelText: {
    type: String,
    default: '取消'
  },
  /**
   * 按下按钮后是否关闭对话框
   */
  autoClose: {
    type: Boolean,
    default: true
  },
  /**
   * 对话框内容
   */
  content: {
    type: String,
    default: ''
  },
  /**
   * 对话框内容是否居中
   */
  centerContent: {
    type: Boolean,
    default: false
  },
  /**
   * 对话框标题
   */
  title: {
    type: String,
    default: '提示'
  },
  /**
   * 是否隐藏取消按钮
   */
  hideCancel: {
    type: Boolean,
    default: false
  },
  /**
   * 是否隐藏确认按钮
   */
  hideOk: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示遮罩
   */
  mask: {
    type: Boolean,
    default: true
  },
  /**
   * 是否渲染到body元素
   */
  renderToBody: {
    type: Boolean,
    default: true
  },
  /**
   * 是否处于加载状态
   */
  isLoading: {
    type: Boolean,
    default: false
  },
  dynamic: {
    type: Boolean,
    default: false
  }
})

const _isLoading = ref(props.isLoading)

watch(
  () => props.isLoading,
  (newVal) => {
    _isLoading.value = newVal
  }
)

const modalEl = ref()

const emit = defineEmits(['cancel', 'ok', 'open', 'close', 'update:visible'])

const _visible = !props.visibleModifiers['model']
  ? ref(props.visible)
  : computed({
      get() {
        return props.visible
      },
      set(value) {
        emit('update:visible', value)
      }
    })

const close = () => {
  _visible.value = false
  if (props.dynamic) {
    modalEl.value.parentNode &&
      modalEl.value.parentNode.parentNode &&
      modalEl.value.parentNode.parentNode.removeChild(modalEl.value.parentNode)
  }
}

const open = () => {
  _visible.value = true
}

const onCancelButtonClick = () => {
  if (!_visible.value) return
  if (_isLoading.value) return
  emit('cancel')
  if (props.autoClose && !_isLoading.value) {
    close()
  }
}

const onOkButtonClick = () => {
  if (!_visible.value) return
  emit('ok')
  if (props.autoClose) {
    close()
  }
}

const handleOpen = () => {
  if (_visible.value) {
    emit('open')
  }
}

const handleClose = () => {
  if (!_visible.value) {
    emit('close')
  }
}

const onEscKeyUp = (e) => {
  if (e.keyCode === 27) {
    onCancelButtonClick()
  }
}

onMounted(() => {
  document.addEventListener('keyup', onEscKeyUp)
})

onUnmounted(() => {
  document.removeEventListener('keyup', onEscKeyUp)
})

const setLoadingState = (state) => {
  _isLoading.value = state
}

defineExpose({ close, open, setLoadingState })
</script>

<template>
  <teleport to="body" :disabled="!renderToBody">
    <transition name="fade" @after-enter="handleOpen" @after-leave="handleClose">
      <div v-if="_visible" ref="modalEl" class="modal">
        <div v-if="mask" class="mask" @click="onCancelButtonClick"></div>
        <div class="modal-container">
          <div class="title">
            <slot name="header">
              <div class="title-default">{{ title }}</div>
            </slot>
          </div>
          <div class="content" :class="{ center: centerContent }">
            <slot>{{ content }}</slot>
          </div>
          <div v-if="!hideCancel || !hideOk" class="buttons">
            <div v-if="!hideCancel" class="cancel-btn" :class="{ hide: _isLoading }" @click="onCancelButtonClick">
              {{ cancelText }}
            </div>
            <div v-if="!hideOk" class="ok-btn" :class="{ loading: _isLoading }" @click="onOkButtonClick">
              <svg
                v-if="_isLoading"
                class="loading"
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                width="100%"
                viewBox="0 0 120 120"
              >
                <circle cx="50%" cy="50%" r="50" fill="none" class="stroke-white stroke-10" />
              </svg>
              {{ _isLoading ? '' : okText }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  @apply z-80 fixed;
  .mask {
    @apply fixed top-0 left-0 right-0 bottom-0 bg-gray/25 dark:bg-white/30;
  }
  .modal-container {
    @apply max-h-85vh;
    @apply flex flex-col;
    @apply fixed top-1/2 left-1/2 min-w-xs sm:min-w-sm md:max-w-3xl lg:max-w-4xl bg-primary-extralight rounded-xl p-5 transform-gpu -translate-x-1/2 -translate-y-1/2;
    .title {
      @apply pb-2;
      .title-default {
        @apply text-2xl text-primary text-center;
      }
    }

    .content {
      @apply text-lg text-gray whitespace-pre-wrap;
      @apply overflow-auto;

      &.center {
        @apply text-center;
      }
    }

    .buttons {
      @apply flex justify-end space-x-4 mt-3;

      .cancel-btn,
      .ok-btn {
        @apply py-1.5 px-5 rounded-lg cursor-pointer transition select-none transform-gpu h-9;

        &:active {
          @apply scale-90;
        }
      }

      .cancel-btn {
        @apply bg-gray-light bg-opacity-20 text-gray transition opacity-100 pointer-events-auto;

        &:hover {
          @apply bg-opacity-30;
        }

        &.hide {
          @apply opacity-0 pointer-events-none;
        }
      }

      .ok-btn {
        @apply bg-primary text-white;

        .loading {
          @apply transition-all stroke-cap-round;
          animation: loading 2s infinite;
          circle {
            @apply origin-center;
            animation: loading-rotate 2s infinite;
          }
        }

        &:hover {
          @apply bg-opacity-90;
        }

        &.loading {
          @apply opacity-50 pointer-events-none;
          @apply max-w-15;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
