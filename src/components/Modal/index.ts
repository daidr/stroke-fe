import { h, render, type VNode } from 'vue'
import Modal from './CModal.vue'

const createAlertModal = ({
  title = '提示',
  content = '',
  okText = '确认',
  cancelText = '取消',
  hideOk = false,
  hideCancel = false,
  centerContent = false,
  onOk = () => {},
  onCancel = () => {}
}) => {
  const container = document.createElement('div')
  const vnode = h(Modal, {
    title,
    content,
    okText,
    cancelText,
    hideOk,
    hideCancel,
    centerContent,
    dynamic: true,
    visible: true,
    renderToBody: false,
    onOk,
    onCancel
  })
  render(vnode, container)
  document.body.appendChild(container)
}

const createPromptModal = ({
  title = '提示',
  content = '',
  okText = '确认',
  cancelText = '取消',
  hideOk = false,
  hideCancel = false,
  placeholder = '',
  centerContent = false,
  autoClose = true,
  onOk = () => {},
  onCancel = () => {}
}) => {
  const container = document.createElement('div')
  let inputResult = ''
  const input = h('input', {
    placeholder,
    class:
      'bg-white w-full px-2 py-1 rounded-md outline-transparent transition focus:(shadow-primary-shadow shadow-xl)',
    onInput: (e: Event) => {
      inputResult = (e.target as HTMLInputElement).value
    }
  })
  const vnode = h(
    Modal,
    {
      title,
      content,
      okText,
      cancelText,
      hideOk,
      hideCancel,
      autoClose,
      centerContent,
      dynamic: true,
      visible: true,
      renderToBody: false,
      onOk: () => {
        ;(onOk as any)({ modal: vnode, methods: vnode.component?.exposed }, inputResult)
      },
      onCancel: () => {
        ;(onCancel as any)({ modal: vnode, methods: vnode.component?.exposed }, inputResult)
      }
    },
    {
      default: () => [h('p', { class: 'text-primary' }, content), input]
    }
  )
  render(vnode, container)
  document.body.appendChild(container)
}

const createCustomModal = ({
  title = '提示',
  content = '',
  okText = '确认',
  cancelText = '取消',
  hideOk = false,
  hideCancel = false,
  centerContent = false,
  autoClose = true,
  mask = true,
  isLoading = false,
  onOk = () => {},
  onCancel = () => {}
}) => {
  const container = document.createElement('div')
  const vnode = h(
    Modal,
    {
      title,
      okText,
      cancelText,
      hideOk,
      hideCancel,
      autoClose,
      centerContent,
      mask,
      isLoading,
      dynamic: true,
      visible: true,
      renderToBody: false,
      onOk: () => {
        ;(onOk as any)({ modal: vnode, methods: vnode.component?.exposed }, content)
      },
      onCancel: () => {
        ;(onCancel as any)({ modal: vnode, methods: vnode.component?.exposed }, content)
      }
    },
    {
      default: () => content
    }
  )
  render(vnode, container)
  document.body.appendChild(container)
  return vnode
}

export { createAlertModal, createPromptModal, createCustomModal }
