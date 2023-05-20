import axios from '~/utils/axios'
import type { CardInfo, CardType } from '~/components/card/type'

export interface collectCardParams {
  userId: string
  cardId: number
  cardType: CardType
  collecting: boolean
}
export const collectOrCancelCard = async (params: collectCardParams) => {
  return await axios.post('/user/collect/modify', params)
}

export const searchCollectedCards = async (userId: string, cardType: CardType, tagId: number) => {
  return await axios.post<Array<CardInfo>>('/user/collect/query', { userId, cardType, tagId }).then(res => res?.data)
}
