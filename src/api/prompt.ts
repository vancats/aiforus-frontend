import type { PromptInfo } from '~/pages/prompt'
import axios from '~/utils/axios'

namespace PromptPage {

  export interface PromptReqFrom {
    id: number
    click: boolean
  }
  export interface PromptResData {
    toolPageInfo: PromptInfo
  }
}

export const getPromptInfo = (params: PromptPage.PromptReqFrom) => {
  return axios.post<PromptPage.PromptResData>('/promptPageInfo', params)
}
