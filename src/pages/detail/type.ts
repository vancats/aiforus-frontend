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
  pageView: string
  tagList: Array<TagInfo>
  type: number
}

export interface PromptInfo {
  id: number
  name: string
  brief: string
  iconUrl: string
  promptContext: string
  pageView: string
}
