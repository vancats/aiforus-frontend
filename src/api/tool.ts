import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import type { ToolInfo } from '~/pages/detail/type'
import axios from '~/utils/axios'

// 0 是 prompt 1 是 tool
export const getToolTags = async () => {
  return await axios.post<Array<TagInfo>>('/tag/query', { type: 1 })
    .then(res => res?.data)
}

export const getToolCards = async (tagId = 0, context = '', feed = 2) => {
  return await axios.post<Array<CardInfo>>('/card/query', { context, tagId, feed, type: 1 })
    .then(res => res?.data)
}

export const getToolInfo = async (id: number, refresh: boolean) => {
  return await axios.post<ToolInfo>('/card/detail', { id, refresh, type: 1 })
    .then(res => res?.data)
}
