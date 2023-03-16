<template>
  <header layout pt-20>
    <SearchBar v-model:searchValue="searchValue" />
  </header>
  <div layout-content pr-10vw>
    <Content :tags="tags" :lists-data="listsData" @tag-change="tagChange" />
  </div>
</template>

<script setup lang="ts">
import type { CardType, ListType, TagType } from '~/components/Layout/Layout'
import hot from '~/assets/hot.png'
import application from '~/assets/application.png'
import { hotLimitNum } from '~/config/index.js'

defineOptions({ name: 'IndexPage' })

const searchValue = ref('')

// 获取 tag
const tags: TagType[] = reactive([
  {
    id: 0,
    tagName: '全部应用',
    active: true,
  },
  {
    id: 1,
    tagName: '学习',
    active: false,
  },
  {
    id: 2,
    tagName: '职业规划',
    active: false,
  },
  {
    id: 3,
    tagName: '娱乐',
    active: false,
  },
  {
    id: 4,
    tagName: '教育',
    active: false,
  },
  {
    id: 5,
    tagName: '互联网',
    active: false,
  },
])

const data: CardType[] = []

for (let i = 0; i < 30; i++) {
  data.push({
    id: i,
    name: 'ChatGPT',
    explaining: '简单介简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍绍',
    imageUrl: '',
    pageView: Math.floor(Math.random() * 1000),
    hot: false,
  })
}

data.sort((a, b) => b.pageView - a.pageView)

const hotList: CardType[] = []
const normalList: CardType[] = []
for (const item of data) {
  if (item.hot)
    hotList.push(item)

  else
    normalList.push(item)
}

if (hotList.length < 4) {
  const subs = hotLimitNum - hotList.length
  hotList.push(...normalList.slice(0, subs))
  normalList.splice(0, subs)
}

// 获取 lists
const listsData: ListType[] = reactive([
  {
    title: '热门应用',
    icon: hot,
    cardList: hotList,
  },
  {
    title: '更多应用',
    icon: application,
    cardList: normalList,
  },
])

const tagChange = (id: number) => {
  tags.forEach((tag) => {
    if (tag.id === id)
      tag.active = true
    else
      tag.active = false
  })

  // TODO 发送请求
}
</script>
