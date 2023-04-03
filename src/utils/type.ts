export interface TagInfo {
  id: number
  name: string
}

export interface Action {
  row: any
  action: Function
  title: string
  style?: string
}
