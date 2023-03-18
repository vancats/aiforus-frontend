import type { ToolInfo } from '~/pages/tool'
import axios from '~/utils/axios'

namespace ToolPage {

  // 用户返回卡片信息
  export interface ToolReqFrom {
    id: number
    click: boolean
  }
  export interface ToolResData {
    toolPageInfo: ToolInfo
  }
}

// Tool 页面
export const getToolInfo = (params: ToolPage.ToolReqFrom) => {
  // 返回的数据格式可以和服务端约定
  return axios.get<ToolPage.ToolResData>('/toolPageInfo', params)
}
