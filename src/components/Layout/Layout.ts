import type { StyleValue } from 'vue'

interface TagType {
  id: number
  tagName: string
  active: boolean
}

interface CardType {
  id: number
  name: string
  explaining: string
  imageUrl: string
  pageView: number
  hot?: boolean
}

interface ListType {
  title: string
  icon: {
    iconName: string
    iconStyle: StyleValue
  }
  cardList: CardType[]
}

export { TagType, CardType, ListType }
