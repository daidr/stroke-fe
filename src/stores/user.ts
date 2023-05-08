import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    isLogin: true,
    name: '戴兜',
    id: 0
  })
  const isLoggedIn = computed(() => user.value.isLogin)
  function setUserInfo(info: typeof user.value) {
    user.value = info
  }

  return { user, isLoggedIn, setUserInfo }
})
