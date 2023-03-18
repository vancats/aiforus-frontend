<template>
  <header layout pt-20>
    <SearchBar v-model:searchVal="searchVal" @search="onSearch" />
  </header>
  <div layout-content pr-10vw min-h-80vh>
    <Content :tags="tags" :list-data="listData" @tag-change="tagChange" />
  </div>
</template>

<script setup lang="ts">
import type { CardType, TagType } from '~/components/Layout/Layout'
import { getCards, getTags } from '~/api'

defineOptions({ name: 'IndexPage' })

const searchVal = ref('')

// Tag
const tags = ref<TagType[]>([])
const fetchTags = async () => {
  const { data } = await getTags()
  const temp = [{
    id: 0,
    name: '全部应用',
    active: true,
  }]
  if (Array.isArray(data?.tagList)) {
    data?.tagList.forEach((item) => {
      temp.push({
        id: item.id,
        name: item.name,
        active: false,
      })
    })
  }
  tags.value = temp
}
const tagChange = (id: number) => {
  let shouldFresh = true
  tags.value.forEach((tag) => {
    if (tag.id === id) {
      if (tag.active) shouldFresh = false
      tag.active = true
    }
    else {
      tag.active = false
    }
  })
  shouldFresh && fetchCards()
}

// List
const listData = ref<CardType[]>([])
async function fetchCards() {
  const query = searchVal.value
  const tag = tags.value.find(i => i.active)?.id
  const { data } = await getCards({ query, tag })
  if (data?.cardList) {
    listData.value = data?.cardList
  }
}

onMounted(() => {
  fetchTags()
  fetchCards()
})

const onSearch = () => {
  fetchCards()
}
</script>
