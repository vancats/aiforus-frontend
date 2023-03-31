<template>
  <n-space>
    <n-tag
      v-for="tag in tagList" :key="tag.id"
      px-6 py-4
      :bordered="false" text="sm #9C9CA9" bg-transparent rounded-3xl
      :style="activeId === tag.id ? 'color: #FFFFFF; background: #2B2C3E' : ''"
      @click="onClick(tag.id)"
    >
      {{ tag.name }}
    </n-tag>
  </n-space>
</template>

<script setup lang='ts'>
import type { TagInfo } from '../layout/type'

const { tagList } = defineProps<{
  tagList: Array<TagInfo>
  activeId: number
}>()
const { activeId } = defineModel<{
  activeId: number
}>()
const onClick = (id: number) => {
  activeId.value = id
}
</script>
