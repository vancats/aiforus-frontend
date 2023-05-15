import axios, { CHECK_LOGIN, CHECK_TOKEN } from '~/utils/axios'

namespace LoginPage {
  export interface StatusResData {
    code: number
    userId: string
    token: string
  }
}

export const login = async () => {
  return await axios.get<{ qrcodeUrl: string }>('/user/login')
    .then(res => res?.data)
}

export const checkLoginStatus = async () => {
  return await axios.get<LoginPage.StatusResData>(CHECK_LOGIN)
}

export const checkTokenValid = async (token: string) => {
  return await axios.post(CHECK_TOKEN, { token })
}

export const wechatLogin = async (code: string) => {
  return await axios.post<LoginPage.StatusResData>('/user/wx-login', { code, state: 'login' })
}
