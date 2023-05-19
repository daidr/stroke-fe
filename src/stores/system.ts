import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/token'
import { getSystemUserInfo } from '@/api/system/auth'

export const useSystemStore = defineStore('system', () => {
  const system = ref({
    isLoggedIn: false,
    username: '',
    id: 0,
    token: ''
  })
  const isLoggedIn = computed(() => system.value.isLoggedIn)
  function setSystemInfo(info: typeof system.value) {
    system.value = info
  }

  function logout() {
    system.value = {
      isLoggedIn: false,
      username: '',
      id: 0,
      token: ''
    }
    removeToken('system')
    location.reload()
  }

  async function refreshSystemInfo() {
    const info = await getSystemUserInfo()
    if (info) {
      setSystemInfo({ isLoggedIn: true, ...info })
      return true
    }
    return false
  }

  return { system, isLoggedIn, setSystemInfo, logout, refreshSystemInfo }
})
