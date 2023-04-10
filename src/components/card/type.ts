import type { TagInfo } from '~/utils/type'

export interface CardInfo {
  id: number
  name: string
  brief: string
  iconUrl: string
  pageView: number
  hot: boolean
  tags: number[]
  type: number
  tagList: Array<TagInfo>
  like: number
  comment: number
  collect: number
  manualPriority: number
  heat: number
}
