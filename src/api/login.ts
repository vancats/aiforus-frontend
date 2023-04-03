import axios, { CHECK_LOGIN } from '~/utils/axios'

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
