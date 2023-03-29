import type { CardType } from '~/components/Layout/Layout'
import axios from '~/utils/axios'

export const FILE_URL = '/file/upload'
export const uploadFile = async (formData: FormData) => {
  return await axios.post<{ url: string }>(FILE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res?.data)
}

namespace SearchPage {
  // 用户返回标签
  export interface TagResData {
    tagList: Array<{
      id: number
      name: string
    }>
  }

  // 用户返回卡片信息
  export interface CardReqFrom {
    query?: string
    tag?: number
  }
  export interface CardResData {
    cardList: Array<CardType>
  }
}

// 标签
export const getTags = () => {
  // 返回的数据格式可以和服务端约定
  return axios.get<SearchPage.TagResData>('/tag')
}

// 卡片
export const getCards = (params: SearchPage.CardReqFrom) => {
  // 返回的数据格式可以和服务端约定
  return axios.get<SearchPage.CardResData>('/cardBySearchAndTag', params)
}
