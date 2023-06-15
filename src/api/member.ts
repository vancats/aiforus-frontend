import axios, { CHECK_MEMBER_PAY } from '~/utils/axios'
interface PayTypeList {
  payType: number
  duration: number
  fee: number
}

export const fetchMemberPayType = async () => {
  return await axios.get<PayTypeList[]>('member/pay-type/query').then(res => res?.data)
}

export const memberPay = async (userId: string, type: number) => {
  return await axios.post<{ qrcodeUrl: string; orderId: string }>('/member/pay', {
    userId,
    type,
  }).then(res => res?.data)
}

export const checkPayStatus = async (orderId: string, payType: number) => {
  return await axios.post<{ code: number }>(CHECK_MEMBER_PAY, {
    orderId,
    payType,
  }).then(res => res)
}

export const useTheCdkey = async (userId: string, cdkey: string) => {
  return await axios.post<{ toast: string }>('member/cdkey/use', {
    userId,
    cdkey,
  }).then(res => res?.data)
}

export interface UserMemberInfo {
  memberEnergy: number
  memberExpire: number
  memberRank: number
  nickname: string
  profile: string
  tag: string
  userId: string
  isCheckin: string
}

export const getUserInfo = async (userId: string) => {
  return await axios.post<UserMemberInfo>('user/info', {
    userId,
  }).then(res => res?.data)
}

export const userCheckIn = async (userId: string) => {
  return await axios.post<{ toast: string }>('user/check-in', {
    userId,
  }).then(res => res?.data)
}
