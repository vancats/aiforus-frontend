<template>
  <div layout-right-bottom overflow-y-scroll>
    <TagList v-model:active-tag="activeTag" :tag-list="filterTags" title="AI应用" />

    <div prompt-layout>
      <template v-for="tool in tools" :key="tool.id">
        <DetailCard :card-info="tool" />
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useNormalStore } from '../../store/index'
import { getToolCards, getToolTags } from '~/api/tool'
import type { TagInfo } from '~/utils/type'
import type { CardInfo } from '~/components/card/type'
import { getActualTag } from '~/utils'
defineOptions({ name: 'ToolPage' })

const useStore = useNormalStore()

const tagList = ref<TagInfo[]>([])
const fetchTags = async () => {
  try {
    const res = await getToolTags()
    tagList.value = res || []
  }
  catch (e) {
    console.warn(e)
  }
}

const activeTag = ref(0)
useStore.tagId = 0
watch(() => activeTag.value, () => {
  fetchTools()
  useStore.tagId = activeTag.value
})

const tools = ref<CardInfo[]>([])
async function fetchTools() {
  try {
    const data = await getToolCards(activeTag.value, '', activeTag.value ? 1 : 2)
    tools.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

const isFirst = ref(true)
const cachedTags = ref<TagInfo[]>([])
const filterTags = computed(() => {
  if (tools.value.length && tagList.value.length && isFirst.value) {
    const res = getActualTag(tools.value, tagList.value)
    cachedTags.value = res
    isFirst.value = false
    return res
  }
  else {
    return cachedTags.value
  }
})

onMounted(() => {
  fetchTags()
  fetchTools()
})
</script>
