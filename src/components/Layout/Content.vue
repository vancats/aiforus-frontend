<template>
  <n-space py-4>
    <template v-for="tag in tags" :key="tag.id">
      <n-tag
        p-4 rounded-lg cursor-pointer border
        :class="tag.active && 'border-blue'"
        @click="handleClick(tag.id)"
      >
        {{ tag.tagName }}
      </n-tag>
    </template>
  </n-space>
  <template v-for="list in listsData" :key="list.title">
    <ListBar :list-title="list.title" :list-icon="list.icon" :card-list="list.cardList" />
  </template>
</template>

<script setup lang='ts'>
import type { ListType, TagType } from './Layout'
defineProps<{
  tags: TagType[]
  listsData: ListType[]
}>()

const emit = defineEmits(['tagChange'])

defineOptions({
  name: 'ContentPage',
})

function handleClick(id: number) {
  emit('tagChange', id)
}
</script>
