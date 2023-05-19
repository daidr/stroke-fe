import { SystemApiGet as ApiGet, SystemApiPost as ApiPost } from '@/utils/req'

export const regSystem = async (username: string, password: string) => {
  return await ApiPost(`/system/register`, {
    username,
    password
  })
    .then(() => {
      return true
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export const getSystemJWT = async (username: string, password: string) => {
  return await ApiPost(`/system/login`, {
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

interface ISystemUserInfo {
  id: number
  username: string
  password: string
  active: boolean
  token: string
}

export const getSystemUserInfo = async () => {
  return await ApiGet(`/system/info`)
    .then((res) => {
      return res.data as ISystemUserInfo
    })
    .catch((err) => {
      console.log(err)
      return false as false
    })
}

export const changeSystemUserPassword = async (oldPassword: string, newPassword: string) => {
  return await ApiPost(`/system/reset`, {
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
