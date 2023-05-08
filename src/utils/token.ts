export const setToken = (type: 'doctor' | 'system', token: string) => {
  localStorage.setItem(`${type}_token`, token)
}

export const getToken = (type: 'doctor' | 'system') => {
  return localStorage.getItem(`${type}_token`)
}

export const removeToken = (type: 'doctor' | 'system') => {
  localStorage.removeItem(`${type}_token`)
}
