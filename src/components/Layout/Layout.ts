interface TagType {
  id: number
  name: string
  active: boolean
}

interface CardType {
  id: number
  name: string
  explaining: string
  iconUrl: string
  pageView: number
  hot?: boolean
  type: string
}

interface ListType {
  title: string
  icon: string
  cardList: CardType[]
}

export { TagType, CardType, ListType }
