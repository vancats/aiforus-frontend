<template>
  <div overflow-y-scroll pr-14>
    <div title-tags>
      <span mr-6>AI小工具</span>
      <TagList v-model:active-tag="activeTag" :tag-list="filterTags" />
    </div>

    <div prompt-layout>
      <template v-for="prompt in prompts" :key="prompt.id">
        <PromptCard :prompt-info="prompt" />
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getPromptCards, getPromptTags } from '~/api/prompt'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import { getActualTag } from '~/utils'
defineOptions({ name: 'PromptPage' })

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
watch(() => activeTag.value, () => fetchPrompts())

const prompts = ref<CardInfo[]>([])
async function fetchPrompts() {
  try {
    const data = await getPromptCards(activeTag.value)
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
