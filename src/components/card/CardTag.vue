<template>
  <div flex>
    <n-tag v-for="tag in tags" :key="tag.id" card-tag :bordered="false">
      {{ tag.name }}
    </n-tag>
  </div>
</template>

<script setup lang='ts'>
import type { TagInfo } from '~/utils/type'
defineProps<{ tags: Array<TagInfo> }>()
</script>
