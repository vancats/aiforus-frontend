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
  like: number
  comment: number
  collect: number
  manualPriority: number
  heat: number
}

export interface PromptInfo {
  id: number
  name: string
  brief: string
  prompt: string
  input: string
  variableList: Array<Variable>
  iconUrl: string
  visible: boolean
  hot: boolean
  pageView: number
  tagList: Array<TagInfo>
  type: number
  like: number
  comment: number
  collect: number
  manualPriority: number
  heat: number
}

export interface Variable {
  variable: string
  description: string
  value: string
}
