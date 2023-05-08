import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/token'
import { getDoctorInfo } from '@/api/doctor/auth'

export const useDoctorStore = defineStore('doctor', () => {
  const doctor = ref({
    isLoggedIn: false,
    name: '',
    username: '',
    id: 0
  })
  const isLoggedIn = computed(() => doctor.value.isLoggedIn)
  function setDockerInfo(info: typeof doctor.value) {
    doctor.value = info
  }

  function logout() {
    doctor.value = {
      isLoggedIn: false,
      name: '',
      username: '',
      id: 0
    }
    removeToken('doctor')
    location.reload()
  }

  async function refreshDoctorInfo() {
    const info = await getDoctorInfo()
    if (info) {
      setDockerInfo({ isLoggedIn: true, ...info })
      return true
    }
    return false
  }

  return { doctor, isLoggedIn, setDockerInfo, logout, refreshDoctorInfo }
})
