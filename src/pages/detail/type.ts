import type { TagInfo } from '~/utils/type'

export interface ToolInfo {
  id: number
  name: string
  brief: string
  usageContext: string
  outsideUrl: string
  usageImageUrl: string
  usageVideoUrl: string
  qrcodeUrl: string
  iconUrl: string
  pageView: number
  tagList: Array<TagInfo>
  type: number
  hot: boolean
}

export interface PromptInfo {
  id: number
  name: string
  brief: string
  prompt: string
  input: string
  variableList: Array<string>
  iconUrl: string
  visible: boolean
  hot: boolean
  pageView: number
  tagList: Array<TagInfo>
  type: number
}
