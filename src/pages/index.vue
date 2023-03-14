<template>
  <NavBar />
  <header class="sm:px-10vw md:px-20vw  pt-20">
    <SearchBar />
  </header>
  <div
    class="px-10vw md:px-20vw rounded-t-3 bg-#F4F8FD"
  >
    <Content :tags="tags" :lists-data="listsData" @tag-change="tagChange" />
  </div>
</template>

<script setup lang="ts">
import type { ListType, TagType } from '~/components/Layout/Layout'
import hot from '~/assets/hot.png'
import application from '~/assets/application.png'

defineOptions({
  name: 'IndexPage',
})

const tags: TagType[] = reactive([
  {
    id: 0,
    tagName: '全部',
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

const listsData: ListType[] = reactive([
  {
    title: '热门应用',
    icon: hot,
    cardList: [
      {
        id: 0,
        name: 'ChatGPT',
        explaining: '简单介简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍简单介绍绍',
        imageUrl: '',
        pageView: 0,
        hot: false,
      },
    ],
  },
  {
    title: '更多应用',
    icon: application,
    cardList: [
      {
        id: 1,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 2,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 3,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 4,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 5,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 6,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 7,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 8,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 9,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 10,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
      {
        id: 11,
        name: 'ChatGPT',
        explaining: 'ChatGPT是美国人工智能研究实验室OpenAIIIIIIIIIII',
        imageUrl: '简单介绍',
        pageView: 0,
        hot: false,
      },
    ],
  },
])

const tagChange = (id: number) => {
  tags.forEach((tag) => {
    if (tag.id === id)
      tag.active = true
    else
      tag.active = false
  })
}
</script>
