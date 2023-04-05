import axios from '~/utils/axios'

namespace ChatPage {
  export interface ChatReqData {
    promptId: number
    context: Array<any>
    variableList: Array<{
      variable: string
      value: string
    }>
  }

  export interface ChatResData {
    data: any
  }
}

export const getChatContent = (params: ChatPage.ChatReqData) => {
  return axios.post<ChatPage.ChatResData>('/gpt/chat', params)
}
