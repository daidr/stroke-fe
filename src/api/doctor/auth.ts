import { ApiGet, ApiPost } from '@/utils/req'

export const regDoctor = async (username: string, password: string, name: string, id: number) => {
  return await ApiPost(`/api/doctor/register`, {
    username,
    password,
    name,
    id: id - 0
  })
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export const getDoctorJWT = async (username: string, password: string) => {
  return await ApiPost(`/doctor/login`, {
    username,
    password
  })
    .then((res) => {
      return res.data as string
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

interface IDoctorInfo {
  id: number
  name: string
  username: string
  password: string
  active: boolean
}

export const getDoctorInfo = async () => {
  return await ApiGet(`/doctor/info`)
    .then((res) => {
      return res.data as IDoctorInfo
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export const changeDoctorPassword = async (oldPassword: string, newPassword: string) => {
  return await ApiPost(`/doctor/reset`, {
    old_password: oldPassword,
    new_password: newPassword
  })
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}
