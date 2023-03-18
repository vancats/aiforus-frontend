<template>
  <n-space py-4>
    <n-tag
      v-for="tag in tags" :key="tag.id"
      p-4 border rounded-lg cursor
      :class="tag.active && 'border-blue'"
      @click="onClick(tag.id)"
    >
      {{ tag.name }}
    </n-tag>
  </n-space>
  <ListBar
    v-for="list in listBars.filter(item => item.cardList.length)" :key="list.title"
    :list-title="list.title" :list-icon="list.icon" :card-list="list.cardList"
  />
</template>

<script setup lang='ts'>
import type { CardType, TagType } from './Layout'
import hot from '~/assets/hot.png'
import application from '~/assets/application.png'

const props = defineProps<{
  tags: TagType[]
  listData: CardType[]
}>()
const emit = defineEmits(['tagChange'])

defineOptions({ name: 'Content' })

const { listData, tags } = toRefs(props)
const onClick = (id: number) => emit('tagChange', id)

const listBars = computed(() => {
  const currentTag = tags.value.find(tag => tag.active)
  if (currentTag?.id) {
    return [
      {
        title: '',
        icon: '',
        cardList: listData.value,
      },
    ]
  }
  return [
    {
      title: '热门应用',
      icon: hot,
      cardList: listData.value.slice(0, 4),
    },
    {
      title: '更多应用',
      icon: application,
      cardList: listData.value.slice(4),
    },
  ]
})
</script>
