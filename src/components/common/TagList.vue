<template>
  <div>
    <div v-if="title" mobile-only>
      <div text-4 mb-2>
        {{ title }}
      </div>
    </div>
    <div title-tags>
      <span v-if="title" web-only mr-6>{{ title }}</span>
      <n-space :size="4">
        <n-tag
          v-for="tag in tagList" :key="tag.id"
          title-tag :bordered="false"
          :style="activeTag === tag.id ? 'color: #FFFFFF; background: #2B2C3E' : ''"
          @click="onClick(tag.id)"
        >
          {{ tag.name }}
        </n-tag>
      </n-space>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { TagInfo } from '~/utils/type'

const { tagList, title } = defineProps<{ tagList: Array<TagInfo>; title?: string }>()
const { activeTag } = defineModel<{ activeTag: number }>()
const onClick = (id: number) => activeTag.value = id
</script>
