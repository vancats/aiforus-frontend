import axios from '~/utils/axios'

namespace FeedbackPage {

  // 用户返回卡片信息
  export interface FeedbackReqFrom {
    type: number
    context: string
  }
  export interface FeedbackResData {
  }
}

// Feedback 页面
export const postFeedback = (params: FeedbackPage.FeedbackReqFrom) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<FeedbackPage.FeedbackResData>('/feedback', params)
}
