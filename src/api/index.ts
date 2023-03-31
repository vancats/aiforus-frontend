import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/components/layout/type'
import axios from '~/utils/axios'

namespace IndexPage {
  export interface CardReqFrom {
    context: string
    tagId: number
    type: number
  }
}

// 0 是 prompt 1 是 tool
export const getTags = async (type: number) => {
  return await axios.post<Array<TagInfo>>('/tag/query', { type })
    .then(res => res?.data)
}

export const getCards = async (params: IndexPage.CardReqFrom) => {
  return await axios.post<Array<CardInfo>>('/card/query', params)
    .then(res => res?.data)
}
