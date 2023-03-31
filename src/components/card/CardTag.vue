<template>
  <div flex>
    <n-tag v-for="tag in tags" :key="tag" card-tag class="tag-card" :bordered="false">
      {{ tag }}
    </n-tag>
  </div>
</template>

<script setup lang='ts'>
defineProps<{
  tags: Array<string>
}>()
</script>
