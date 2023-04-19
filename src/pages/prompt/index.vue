<template>
  <div overflow-y-scroll pr-14>
    <TagList v-model:active-tag="activeTag" :tag-list="filterTags" title="AI小工具" />

    <div prompt-layout>
      <template v-for="prompt in prompts" :key="prompt.id">
        <DetailCard :card-info="prompt" />
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useNormalStore } from '../../store/index'
import { getPromptCards, getPromptTags } from '~/api/prompt'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import { getActualTag } from '~/utils'
defineOptions({ name: 'PromptPage' })

const useStore = useNormalStore()
const tagList = ref<TagInfo[]>([])
const fetchTags = async () => {
  try {
    const res = await getPromptTags()
    tagList.value = res || []
  }
  catch (e) {
    console.warn(e)
  }
}

const activeTag = ref(0)
useStore.tagId = 0
watch(() => activeTag.value, () => {
  fetchPrompts()
  useStore.tagId = activeTag.value
})

const prompts = ref<CardInfo[]>([])
async function fetchPrompts() {
  try {
    const data = await getPromptCards(activeTag.value, '', activeTag.value ? 1 : 2)
    prompts.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

const isFirst = ref(true)
const cachedTags = ref<TagInfo[]>([])
const filterTags = computed(() => {
  if (prompts.value.length && tagList.value.length && isFirst.value) {
    const res = getActualTag(prompts.value, tagList.value)
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
  fetchPrompts()
})
</script>
