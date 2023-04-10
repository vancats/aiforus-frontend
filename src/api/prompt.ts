import type { TagInfo } from '~/utils/type'
import axios from '~/utils/axios'
import type { CardInfo } from '~/components/card/type'
import type { PromptInfo } from '~/pages/detail/type'

// 0 是 prompt 1 是 tool
export const getPromptTags = async () => {
  return await axios.post<Array<TagInfo>>('/tag/query', { type: 0 })
    .then(res => res?.data)
}

export const getPromptCards = async (tagId = 0, context = '') => {
  return await axios.post<Array<CardInfo>>('/card/query', { context, tagId, feed: 1, type: 0 })
    .then(res => res?.data)
}

export const getPromptInfo = async (id: number, refresh: boolean) => {
  return await axios.post<PromptInfo>('/card/detail', { id, refresh, type: 0 })
    .then(res => res?.data)
}
