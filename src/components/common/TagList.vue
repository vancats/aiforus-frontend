<template>
  <n-space :size="4">
    <n-tag
      v-for="tag in tagList" :key="tag.id"
      title-tag :bordered="false" hover:color="#FFFFFF" hover:bg="#2B2C3E"
      :style="activeTag === tag.id ? 'color: #FFFFFF; background: #2B2C3E' : ''"
      @click="onClick(tag.id)"
    >
      {{ tag.name }}
    </n-tag>
  </n-space>
</template>

<script setup lang='ts'>
import type { TagInfo } from '~/utils/type'
const { tagList } = defineProps<{ tagList: Array<TagInfo> }>()
const { activeTag } = defineModel<{ activeTag: number }>()
const onClick = (id: number) => activeTag.value = id
</script>
