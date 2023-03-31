import type { ToolInfo } from '~/pages/tool'
import axios from '~/utils/axios'

namespace ToolPage {

  export interface ToolReqFrom {
    id: number
    click: boolean
  }
  export interface ToolResData {
    toolPageInfo: ToolInfo
  }
}

export const getToolInfo = (params: ToolPage.ToolReqFrom) => {
  return axios.get<ToolPage.ToolResData>('/toolPageInfo', params)
}
