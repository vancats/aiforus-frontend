import type { PromptInfo } from '~/pages/prompt'
import axios from '~/utils/axios'

namespace PromptPage {

  // 用户返回卡片信息
  export interface PromptReqFrom {
    id: number
    click: boolean
  }
  export interface PromptResData {
    toolPageInfo: PromptInfo
  }
}

// Prompt 页面
export const getPromptInfo = (params: PromptPage.PromptReqFrom) => {
  // 返回的数据格式可以和服务端约定
  return axios.get<PromptPage.PromptResData>('/promptPageInfo', params)
}
