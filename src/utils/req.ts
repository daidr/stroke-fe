import { useMessage } from '@/components/Message'
import { getToken } from '@/utils/token'
import axios from 'axios'

const { error } = useMessage()

const baseUrl = import.meta.env.VITE_BASE_URL
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

instance.interceptors.request.use((config) => {
  config.headers['authorization'] = `Bearer ${getToken('doctor')}`
  return config
})

instance.interceptors.response.use(
  (resp) => {
    if (resp.data.code === 200) {
      // success
      return resp.data
    } else {
      error(resp.data.msg)
      return Promise.reject(resp)
    }
  },
  (err) => {
    if (err.response.status === 401) {
      error('未授权的操作，请尝试重新登录')
      location.href = '/login'
      return Promise.reject(err)
    }
    error(err.response.statusText)
    console.log(err.response)
    return Promise.reject(err)
  }
)

export const ApiGet = (path: string) => {
  const url = `${path}`
  return instance.get(url)
}

export const ApiPost = (path: string, data: any, timeout = 5000) => {
  const url = `${path}`
  return instance.post(url, data, { timeout })
}


const instance2 = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

instance2.interceptors.request.use((config) => {
  config.headers['authorization'] = `Bearer ${getToken('system')}`
  return config
})

instance2.interceptors.response.use(
  (resp) => {
    if (resp.data.code === 200) {
      // success
      return resp.data
    } else {
      error(resp.data.msg)
      return Promise.reject(resp)
    }
  },
  (err) => {
    if (err.response.status === 401) {
      error('未授权的操作，请尝试重新登录')
      location.href = '/login'
      return Promise.reject(err)
    }
    error(err.response.statusText)
    console.log(err.response)
    return Promise.reject(err)
  }
)

export const SystemApiGet = (path: string) => {
  const url = `${path}`
  return instance2.get(url)
}

export const SystemApiPost = (path: string, data: any, timeout = 5000) => {
  const url = `${path}`
  return instance2.post(url, data, { timeout })
}
