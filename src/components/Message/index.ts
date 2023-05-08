import { reactive } from 'vue'

const messageList = reactive({} as Record<string, IMessageOptions>)

const messageIdList = reactive([] as string[])

// 默认值
const DURATION = 3000

// 随机生成不重复的ID
const createId = (): string => {
  const id = Math.random().toString(36).slice(2, 9)
  if (messageIdList.includes(id)) {
    return createId()
  }
  return id
}

export interface IMessageOptions {
  id?: string
  duration?: number
  text?: string
  icon?: 'success' | 'error' | 'info' | 'warn'
}

const showMessage = (options: IMessageOptions) => {
  // 创建一个messageId
  const id = createId()
  // 将 id 存入 messageIdList
  messageIdList.push(id)
  // 将 options 存入 messageList
  messageList[id] = {
    ...options,
    id,
    duration: options.duration || DURATION
  }

  // 计时器，用于删除message
  setTimeout(() => {
    messageIdList.splice(messageIdList.indexOf(id), 1)
    delete messageList[id]
  }, messageList[id].duration)
  return id
}

const removeMessage = (id: string) => {
  messageIdList.splice(messageIdList.indexOf(id), 1)
  delete messageList[id]
}

const changeMessageText = (id: string, text: string) => {
  if (messageList[id]) {
    messageList[id].text = text
    return true
  } else {
    return false
  }
}

const suger = {
  success: (text: string, duration: number) => {
    return showMessage({
      text,
      icon: 'success',
      duration
    })
  },
  error: (text: string, duration?: number) => {
    return showMessage({
      text,
      icon: 'error',
      duration
    })
  },
  info: (text: string, duration?: number) => {
    return showMessage({
      text,
      icon: 'info',
      duration
    })
  },
  warn: (text: string, duration?: number) => {
    return showMessage({
      text,
      icon: 'warn',
      duration
    })
  }
}

export const useMessage = () => {
  return {
    showMessage,
    removeMessage,
    changeMessageText,
    messageList,
    messageIdList,
    ...suger
  }
}
